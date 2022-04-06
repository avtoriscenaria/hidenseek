import { Socket } from 'socket.io';
import { GAME_STATUSES } from 'src/constants';

export const runTimer = async function (client: Socket, timeStep) {
  const { room } = client.handshake.query;

  if (!room) {
    return;
  }

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

    this.changeTurnOrder(room, timeStep);
  }
};
