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

  @SubscribeMessage('start_game')
  async startGame(client: Socket, payload: string): Promise<void> {
    const { room, player: player_id } = client.handshake.query;
    const game = (await this.gameModel.find({ _id: room }).exec())[0];

    if (game && game.status === GAME_STATUSES.start) {
      const player = game.players.find(
        (p) => p._id.toString() === player_id.toString(),
      );

      if (player && player.creator) {
        game.status = GAME_STATUSES.in_process;
        await game.save();
        this.server.in(room).emit('start_game');
      } else {
        console.log('ERROR');
      }
    } else {
      console.log('ERROR');
    }
  }

  @SubscribeMessage('move')
  async movePlayer(client: Socket, payload: any): Promise<void> {
    const { room, player_id } = client.handshake.query;
    const { coordinates } = payload;
    console.log('CLIENT', player_id);
    console.log('PAYLOAD', coordinates);
    const game = (await this.gameModel.find({ _id: room }).exec())[0];

    if (game) {
      const gamePlayer = game.players.find(
        (p) => p._id.toString() === player_id.toString(),
      );

      if (gamePlayer && coordinates.x && coordinates.y) {
        const isPlayerOnPosition = game.players.some(
          (p) =>
            p.position.x === coordinates.x && p.position.y === coordinates.y,
        );

        if (!isPlayerOnPosition || gamePlayer.hunter) {
          game.players = game.players.map((p) =>
            p._id.toString() === player_id.toString()
              ? { ...p, position: coordinates }
              : gamePlayer.hunter &&
                p.position.x === coordinates.x &&
                p.position.y === coordinates.y
              ? { ...p, caught: true }
              : p,
          );

          await game.save();
          this.server.in(room).emit('move', { players: game.players });
        }
      }
    }
  }

  @SubscribeMessage('logout')
  logoutPlayer(client: Socket, payload: string): void {
    console.log('LOGOUT');
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket) {
    const { token, room, player_id } = client.handshake.query;
    client.use(async (req, next) => {
      const isVerified = await this.jwt.checkAuthToken(token);
      console.log('isVerified', isVerified);
      if (isVerified) {
        next();
      } else {
        client.emit('logout');
      }
    });

    client.join(room);

    if (room && player_id) {
      const game = (await this.gameModel.find({ _id: room }).exec())[0];

      if (game) {
        const gamePlayer = game.players.find(
          (p) => p._id.toString() === player_id.toString(),
        );

        if (gamePlayer) {
          client.broadcast.to(room).emit('player_connect', gamePlayer);
        }
      }
    }

    this.logger.log(`Client connected: ${client.id}`);
  }
}
