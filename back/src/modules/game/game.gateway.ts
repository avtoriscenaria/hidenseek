import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';

import { JWT } from '../common/services/jwt.service';
import { Game, GameDocument } from './schemas/game.schema';
import { Player, PlayerDocument } from '../auth/schemas/player.schema';
import { GAME_STATUSES } from 'src/constants';

@WebSocketGateway()
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private jwt: JWT,
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('GameGateway');
  private TIMER_RUN = {};
  private TIME_INTERVAL = {};

  private changeTurnOrder(room: string, timeStep): void {
    this.TIME_INTERVAL[room] = setInterval(async () => {
      console.log('INTERVAL-', timeStep);
      this.TIMER_RUN[room] = new Date().getTime();
      const game = (await this.gameModel.find({ _id: room }).exec())[0];

      game.hide = !game.hide;
      game.players = game.players.map((p) => ({
        ...p,
        step:
          Boolean(p.hunter) && !game.hide
            ? game.settings.hunterStep
            : !Boolean(p.hunter) && game.hide
            ? game.settings.preyStep
            : 0,
      }));

      await game.save();

      this.server.in(room).emit('timer', { time: new Date().getTime() });
      this.server.in(room).emit('update_game', { game });
    }, timeStep);
  }

  private async disconnectPlayer(client: Socket): Promise<void> {
    const { room, player_id } = client.handshake.query;

    const game = await this.gameModel.findById(room);

    if (game) {
      game.players = game.players.map((p) =>
        p._id.toString() === player_id.toString() ? { ...p, online: false } : p,
      );
      game.save();

      if (
        !game.players.some((p) => p.online) &&
        this.TIME_INTERVAL[room] !== undefined
      ) {
        clearInterval(this.TIME_INTERVAL[room]);
        this.TIMER_RUN[room] = undefined;
        this.TIME_INTERVAL[room] = undefined;
      }
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  }

  @SubscribeMessage('start_game')
  async startGame(client: Socket, { timeStep }): Promise<void> {
    const { room, player_id } = client.handshake.query;
    const game = await this.gameModel.findById(room);

    if (Boolean(game) && game.status === GAME_STATUSES.start) {
      const player = game.players.find(
        (p) => p._id.toString() === player_id.toString(),
      );

      if (Boolean(player) && player.creator) {
        game.status = GAME_STATUSES.in_process;
        game.hide = true;
        game.players = game.players.map((p) =>
          Boolean(p.hunter) ? p : { ...p, step: 10 },
        );

        await game.save();

        this.server.in(room).emit('update_game', { game });
        this.server.in(room).emit('start_game');

        this.TIMER_RUN[room] = new Date().getTime();
        this.server.in(room).emit('timer', {
          startTime: 0,
        });

        console.log('client is subscribing to timer with interval ', timeStep);
        if (this.TIME_INTERVAL[room] !== undefined) {
          clearInterval(this.TIME_INTERVAL[room]);
          this.TIME_INTERVAL[room] = undefined;
        }

        this.changeTurnOrder(room, timeStep);
      } else {
        console.log('ERROR');
      }
    } else {
      console.log('ERROR');
    }
  }

  @SubscribeMessage('run_timer')
  async runTimer(client: Socket, timeStep: number): Promise<void> {
    const { room } = client.handshake.query;

    const game = await this.gameModel.findById(room);

    const dontRunTimer =
      !Boolean(game) ||
      game.status !== GAME_STATUSES.in_process ||
      game.players.some((p) => p.won);

    if (!dontRunTimer && this.TIMER_RUN[room] === undefined) {
      this.TIMER_RUN[room] = new Date().getTime();

      client.emit('timer', {
        startTime: 0,
      });

      console.log(
        'client is subscribing to timmmmmer with interval ',
        timeStep,
      );

      this.changeTurnOrder(room, timeStep);
    }
  }

  @SubscribeMessage('get_game')
  async findGame(client: Socket): Promise<void> {
    const { room } = client.handshake.query;

    const game = await this.gameModel.findById(room);

    this.server.in(room).emit('update_game', { game });
  }

  @SubscribeMessage('end_turn')
  async endTurn(client: Socket, { timeStep }): Promise<void> {
    const { room, player_id } = client.handshake.query;

    const game = await this.gameModel.findById(room);
    const gamePlayers = game.players.map((p) => ({
      ...p,
      step: p._id.toString() === player_id.toString() ? 0 : p.step,
    }));
    game.players = gamePlayers;

    if (
      !game.players.some(
        (p) =>
          Boolean(p.hunter) !== Boolean(game.hide) &&
          p.step > 0 &&
          !Boolean(p.caught),
      )
    ) {
      game.hide = !game.hide;
      game.players = game.players.map((p) => ({
        ...p,
        step:
          Boolean(p.hunter) && !game.hide
            ? game.settings.hunterStep
            : !Boolean(p.hunter) && game.hide
            ? game.settings.preyStep
            : 0,
      }));

      await game.save();

      clearInterval(this.TIME_INTERVAL[room]);
      this.TIMER_RUN[room] = new Date().getTime();
      this.TIME_INTERVAL[room] = undefined;

      this.server.in(room).emit('update_game', { game });
      this.server.in(room).emit('timer', { time: new Date().getTime() });

      this.changeTurnOrder(room, timeStep);
    } else {
      await game.save();

      this.server.in(room).emit('update_game', { game });
    }
  }

  @SubscribeMessage('hunter_role')
  async setHunterRole(client: Socket, { selectedPlayer }): Promise<void> {
    const { room } = client.handshake.query;

    const game = await this.gameModel.findById(room);
    console.log('GAME', game);
    if (Boolean(game)) {
      const updatedPlayers = game.players.map((p) => ({
        ...p,
        hunter: p._id.toString() === selectedPlayer.toString() || undefined,
      }));

      game.players = updatedPlayers;

      await game.save();

      this.server.in(room).emit('update_game', { game });
    }
  }

  @SubscribeMessage('move')
  async movePlayer(client: Socket, payload: any): Promise<void> {
    const { room, player_id } = client.handshake.query;
    const { coordinates } = payload;
    const game = await this.gameModel.findById(room);

    if (game) {
      const gamePlayer = game.players.find(
        (p) => p._id.toString() === player_id.toString(),
      );

      if (
        gamePlayer &&
        Boolean(gamePlayer.hunter) !== Boolean(game.hide) &&
        Boolean(gamePlayer.step) &&
        coordinates.x &&
        coordinates.y
      ) {
        const isPlayerOnPosition = game.players.some(
          (p) =>
            p.position.x === coordinates.x && p.position.y === coordinates.y,
        );

        if (!isPlayerOnPosition || gamePlayer.hunter) {
          game.players = game.players.map((p) =>
            p._id.toString() === player_id.toString()
              ? {
                  ...p,
                  position: coordinates,
                  step: p.step - 1 >= 0 ? p.step - 1 : 0,
                }
              : gamePlayer.hunter &&
                p.position.x === coordinates.x &&
                p.position.y === coordinates.y
              ? { ...p, caught: true }
              : p,
          );

          if (
            gamePlayer.hunter &&
            !game.players.some((p) => !Boolean(p.hunter) && !Boolean(p.caught))
          ) {
            game.players = game.players.map((p) =>
              p.hunter ? { ...p, won: true } : p,
            );
            game.status = GAME_STATUSES.finished;

            clearInterval(this.TIME_INTERVAL[room]);
            this.TIMER_RUN[room] = undefined;
            this.TIME_INTERVAL[room] = undefined;
          }
          await game.save();

          this.server.in(room).emit('update_game', { game });
        }
      }
    }
  }

  @SubscribeMessage('logout')
  logoutPlayer(client: Socket): void {
    this.disconnectPlayer(client);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.disconnectPlayer(client);
  }

  async handleConnection(client: Socket) {
    const { token, room, player_id } = client.handshake.query;
    client.use(async (req, next) => {
      const isVerified = await this.jwt.checkAuthToken(token);

      if (isVerified) {
        next();
      } else {
        client.emit('logout');
      }
    });

    client.join(room);

    if (this.TIMER_RUN[room]) {
      const startTime = Math.round(
        (new Date().getTime() - this.TIMER_RUN[room]) / 1000,
      );

      client.emit('timer', {
        startTime,
      });
    }

    if (room && player_id) {
      const game = await this.gameModel.findById(room);

      if (game) {
        const gamePlayer = game.players.find(
          (p) => p._id.toString() === player_id.toString(),
        );

        if (gamePlayer && !Boolean(this.TIMER_RUN[room])) {
          game.players = game.players.map((p) =>
            p._id.toString() === player_id.toString()
              ? { ...p, online: true }
              : p,
          );
          game.save();

          client.broadcast.to(room).emit('player_connect', gamePlayer);
        }
      }
    }

    this.logger.log(`Client connected: ${client.id}`);
  }
}
