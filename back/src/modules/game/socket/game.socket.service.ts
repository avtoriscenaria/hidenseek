import { Socket, Server } from 'socket.io';
import {
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import {
  connection,
  startGame,
  runTimer,
  getGame,
  endTurn,
  setHunter,
  connectToTheGame,
  move,
  leave,
} from './helpers';

import { GameGateway } from './game.gateway';

export class GameSocketService
  extends GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(jwt, gameModel, playerModal) {
    super(jwt, gameModel, playerModal);
    this.socketConnection = connection.bind(this);
    this.socketStartGame = startGame.bind(this);
    this.socketRunTimer = runTimer.bind(this);
    this.socketGetGame = getGame.bind(this);
    this.socketEndTurn = endTurn.bind(this);
    this.socketSetHunter = setHunter.bind(this);
    this.socketConnectToTheGame = connectToTheGame.bind(this);
    this.socketMove = move.bind(this);
    this.socketLeave = leave.bind(this)
  }

  socketConnection;
  socketStartGame;
  socketRunTimer;
  socketGetGame;
  socketEndTurn;
  socketSetHunter;
  socketConnectToTheGame;
  socketMove;
  socketLeave;

  @SubscribeMessage('start_game')
  async startGame(client: Socket, { timeStep }): Promise<void> {
    console.log('start_game');
    this.socketStartGame(client, timeStep);
  }

  @SubscribeMessage('run_timer')
  async runTimer(client: Socket, timeStep: number): Promise<void> {
    console.log('run_timer');
    this.socketRunTimer(client, timeStep);
  }

  @SubscribeMessage('get_game')
  async findGame(client: Socket): Promise<void> {
    console.log('get_game');
    this.socketGetGame(client);
  }

  @SubscribeMessage('end_turn')
  async endTurn(client: Socket, { timeStep }): Promise<void> {
    console.log('end_turn');
    this.socketEndTurn(client, timeStep);
  }

  @SubscribeMessage('hunter_role')
  async setHunterRole(client: Socket, { selectedPlayer }): Promise<void> {
    console.log('hunter_role');
    this.socketSetHunter(client, selectedPlayer);
  }

  @SubscribeMessage('connect_to_game')
  async connectToGame(client: Socket, payload: any): Promise<void> {
    this.socketConnectToTheGame(client, payload);
  }

  @SubscribeMessage('move')
  async movePlayer(client: Socket, payload: any): Promise<void> {
    console.log('move');
    this.socketMove(client, payload);
  }

  @SubscribeMessage('leave')
  async leaveGame(client: Socket): Promise<void> {
    console.log('leave');
    this.socketLeave(client)
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.disconnectPlayer(client);
  }

  async handleConnection(client: Socket) {
    const { token } = client.handshake.query;
    client.use(async (_, next) => {
      const isVerified = await this.jwt.checkAuthToken(token);

      if (isVerified) {
        next();
      } else {
        client.emit('logout');
      }
    });

    this.socketConnection(client);

    this.logger.log(`Client connected: ${client.id}`);
  }
}
