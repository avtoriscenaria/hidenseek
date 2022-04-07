import { Socket } from 'socket.io';

import { GAME_STATUSES } from 'src/constants';

export const startGame = async function (
  client: Socket,
  { timeStep, game_id: room },
) {
  const { player_id } = client.handshake.query;

  if (!room) {
    return;
  }

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

      if (this.TIME_INTERVAL[room] !== undefined) {
        clearInterval(this.TIME_INTERVAL[room]);
        this.TIME_INTERVAL[room] = undefined;
      }

      this.changeTurnOrder(room, timeStep);
    } else {
    }
  } else {
  }
};
