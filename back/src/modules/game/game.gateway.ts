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

  @SubscribeMessage('')
  middleware(client: Socket, payload: string): void {
    console.log('MIDDLEWARE', client);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  @SubscribeMessage('move')
  movePlayer(client: Socket, payload: string): void {
    console.log('CLIENT', client.id);
    console.log('PAYLOAD', payload);
    client.broadcast.emit('move', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    client.use(async (req, next) => {
      const isVerified = await this.jwt.checkAuthToken(client.handshake.query);

      if (isVerified) {
        next();
      } else {
        client.emit('logout');
      }
    });
    this.logger.log(`Client connected: ${client.id}`);
  }
}
