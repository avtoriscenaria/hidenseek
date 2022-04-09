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
  move,
  leave,
  createGame,
  findGame,
} from './actions';
import { GameGateway } from './game.gateway';

export class GameSocketService
  extends GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(jwt, gameModel, playerModel) {
    super(jwt, gameModel, playerModel);
    this.socketConnection = connection.bind(this);
    this.socketStartGame = startGame.bind(this);
    this.socketRunTimer = runTimer.bind(this);
    this.socketGetGame = getGame.bind(this);
    this.socketEndTurn = endTurn.bind(this);
    this.socketSetHunter = setHunter.bind(this);
    this.socketMove = move.bind(this);
    this.socketLeave = leave.bind(this);
    this.socketCreateGame = createGame.bind(this);
    this.socketFindGame = findGame.bind(this);
  }

  socketConnection;
  socketStartGame;
  socketRunTimer;
  socketGetGame;
  socketEndTurn;
  socketSetHunter;
  socketCreateGame;
  socketMove;
  socketLeave;
  socketFindGame;

  @SubscribeMessage('start_game')
  async startGame(client: Socket, payload): Promise<void> {
    this.socketStartGame(client, payload);
  }

  @SubscribeMessage('get_game')
  async findGame(client: Socket): Promise<void> {
    this.socketGetGame(client);
  }

  @SubscribeMessage('end_turn')
  async endTurn(client: Socket, payload): Promise<void> {
    this.socketEndTurn(client, payload);
  }

  @SubscribeMessage('hunter_role')
  async setHunterRole(client, payload): Promise<void> {
    this.socketSetHunter(payload);
  }

  @SubscribeMessage('connect_to_game')
  async connectToGame(client: Socket, payload: any): Promise<void> {
    const { create, player_id, gameKey } = payload;
    const player = await this.playerModel.getById(player_id);
    if (player) {
      if (create) {
        this.socketCreateGame(client, player);
      } else {
        this.socketFindGame(client, player, gameKey);
      }
    }
  }

  @SubscribeMessage('move')
  async movePlayer(client: Socket, payload: any): Promise<void> {
    this.socketMove(client, payload);
  }

  @SubscribeMessage('leave')
  async leaveGame(client: Socket, payload): Promise<void> {
    this.socketLeave(client, payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.disconnectPlayer(client);
  }

  async handleConnection(client: Socket) {
    const { token } = client.handshake.query;
    console.log('CHECK');
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
