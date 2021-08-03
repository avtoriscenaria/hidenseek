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
  movePlayer(client: Socket, payload: string): void {
    const { room } = client.handshake.query;
    console.log('CLIENT', room);
    console.log('PAYLOAD', payload);
    client.broadcast.to(room).emit('move', payload);
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
    const { token, room, player } = client.handshake.query;
    client.use(async (req, next) => {
      const isVerified = await this.jwt.checkAuthToken(token);

      if (isVerified) {
        next();
      } else {
        client.emit('logout');
      }
    });
    client.join(room);

    if (room && player) {
      const game = (await this.gameModel.find({ _id: room }).exec())[0];
      if (game) {
        const gamePlayer = game.players.find(
          (p) => p._id.toString() === player.toString(),
        );
        if (gamePlayer) {
          console.log('BORDCAST CONNECT');
          client.broadcast.to(room).emit('player_connect', gamePlayer);
        }
      }
    }

    this.logger.log(`Client connected: ${client.id}`);
  }
}
