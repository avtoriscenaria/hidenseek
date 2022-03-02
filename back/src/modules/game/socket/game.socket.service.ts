import { Socket, Server } from 'socket.io';
import {
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { GAME_STATUSES } from 'src/constants';

import { GameGateway } from './game.gateway';

export class GameSocketService
  extends GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(jwt, gameModel, playerModal) {
    super(jwt, gameModel, playerModal);
  }

  @SubscribeMessage('start_game')
  async startGame(client: Socket, { timeStep }): Promise<void> {
    console.log('start_game');
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
    console.log('run_timer');
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
    console.log('get_game');
    const { room } = client.handshake.query;

    const game = await this.gameModel.findById(room);

    this.server.in(room).emit('update_game', { game });
  }

  @SubscribeMessage('end_turn')
  async endTurn(client: Socket, { timeStep }): Promise<void> {
    console.log('end_turn');
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
    console.log('hunter_role');
    const { room } = client.handshake.query;

    const game = await this.gameModel.findById(room);

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
    console.log('move');
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
                  //step: p.step - 1 >= 0 ? p.step - 1 : 0,
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

    console.log('handleConnection', room, player_id);
    if (room && player_id) {
      const game = await this.gameModel.findById(room);

      if (game) {
        if (
          game.status === GAME_STATUSES.start ||
          game.status === GAME_STATUSES.in_process
        ) {
          const gamePlayer = game.players.find(
            (p) => p._id.toString() === player_id.toString(),
          );

          if (gamePlayer && !Boolean(this.TIMER_RUN[room])) {
            game.players = game.players.map((p) =>
              p._id.toString() === player_id.toString()
                ? { ...p, online: true }
                : p,
            );
          }

          game.save();

          client.join(room);
          console.log(
            'GAME STATUS',
            game.status,
            this.TIMER_RUN[room],
            this.TIME_INTERVAL[room],
          );
          if (game.status === GAME_STATUSES.in_process) {
            // T         I           M            E            R
            if (!Boolean(this.TIMER_RUN[room])) {
              console.log('TIMER NOT RUN');

              client.emit('timer', {
                startTime: 0,
              });

              //this.changeTurnOrder(room, 20_000);
            } else {
              const startTime = Math.round(
                (new Date().getTime() - this.TIMER_RUN[room]) / 1000,
              );
              console.log('START TIME', startTime);
              client.emit('timer', {
                startTime,
              });
            }
          }

          this.server.in(room).emit('update_game', { game, isLoaded: true });
        } else {
          const player = await this.playerModal.findById(player_id);

          player.games_played = [...player.games_played, player.game_id];
          player.game_id = undefined;
          player.save();

          client.leave(room);
        }
      }
    }

    this.logger.log(`Client connected: ${client.id}`);
  }
}
