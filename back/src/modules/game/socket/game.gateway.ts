import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';

import { JWT } from '../../common/services/jwt.service';
import { Game, GameDocument } from '../schemas/game.schema';
import { Player, PlayerDocument } from '../../auth/schemas/player.schema';
import { DataBase } from 'src/modules/common/services/database.service';

@WebSocketGateway()
export class GameGateway {
  constructor(
    public jwt: JWT,
    //public db: DataBase,
    @InjectModel(Game.name) public gameModel: Model<GameDocument>,
    @InjectModel(Player.name) public playerModal: Model<PlayerDocument>,
  ) {}

  @WebSocketServer()
  server: Server;

  public logger: Logger = new Logger('GameGateway');
  public TIMER_RUN = {};
  public TIME_INTERVAL = {};

  public changeTurnOrder(room: string, timeStep): void {
    this.TIME_INTERVAL[room] = setInterval(async () => {
      console.log('INTERVAL-', timeStep);
      this.TIMER_RUN[room] = new Date().getTime();
      const game = (await this.gameModel.find({ _id: room }).exec())[0];

      // const game = (await this.db.getFromDB("game", room)

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

  public async disconnectPlayer(client: Socket): Promise<void> {
    const { room, player_id } = client.handshake.query;
    console.log('DISCONNECT', client.handshake.query);
    if (Boolean(room)) {
      const game = await this.gameModel.findById(room);

      if (game) {
        game.players = game.players.map((p) =>
          p._id.toString() === player_id.toString()
            ? { ...p, online: false }
            : p,
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
      }
    }

    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
