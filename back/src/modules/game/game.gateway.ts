import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { JWT } from '../common/services/jwt.service';

@WebSocketGateway()
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private jwt: JWT) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('GameGateway');

  @SubscribeMessage('move')
  movePlayer(client: Socket, payload: string): void {
    const { room } = client.handshake.query;
    console.log('CLIENT', room);
    console.log('PAYLOAD', payload);
    client.broadcast.to(room).emit('move', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket) {
    const { token, room } = client.handshake.query;
    client.use(async (req, next) => {
      const isVerified = await this.jwt.checkAuthToken(token);

      if (isVerified) {
        next();
      } else {
        client.emit('logout');
      }
    });
    client.join(room);

    this.logger.log(`Client connected: ${client.id}`);
  }
}
