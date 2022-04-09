import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { JWT } from 'src/common/services';

import { GameDBService } from 'src/common/modules/database/game.service';
import { PlayerDBService } from 'src/common/modules/database/player.service';

@WebSocketGateway()
export class GameGateway {
  constructor(
    public jwt: JWT,
    public gameModel: GameDBService,
    public playerModel: PlayerDBService,
  ) {}

  @WebSocketServer()
  server: Server;

  public logger: Logger = new Logger('GameGateway');
  public TIMER_RUN = {};
  public TIME_INTERVAL = {};

  public changeTurnOrder(room: string, timeStep): void {
    this.TIMER_RUN[room] = new Date().getTime();
    this.TIME_INTERVAL[room] = setInterval(async () => {
      this.TIMER_RUN[room] = new Date().getTime();
      console.log('INTERVAL', timeStep);
      const game = await this.gameModel.getById(room);

      const newData = {
        hide: !game.hide,
        players: game.players.map((p) => ({
          ...p,
          step:
            Boolean(p.hunter) && !game.hide
              ? game.settings.hunterStep
              : !Boolean(p.hunter) && game.hide
              ? game.settings.preyStep
              : 0,
        })),
      };

      await this.gameModel.update({ _id: room }, newData);

      this.server.in(room).emit('timer', { time: new Date().getTime() });
      this.server.in(room).emit('update_game', { game });
    }, timeStep);
  }

  public async disconnectPlayer(client: Socket): Promise<void> {
    const { room, player_id } = client.handshake.query;
    console.log('ROOM', room, Boolean(room));
    if (Boolean(room)) {
      const game = await this.gameModel.getById(room);

      if (game) {
        const newData = {
          players: game.players.map((p) =>
            p._id.toString() === player_id.toString()
              ? { ...p, online: false }
              : p,
          ),
        };

        await this.gameModel.update({ _id: room }, newData);

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
