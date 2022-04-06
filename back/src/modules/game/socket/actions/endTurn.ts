import { Socket } from 'socket.io';

export const endTurn = async function (
  client: Socket,
  { timeStep, game_id: room },
) {
  const { player_id } = client.handshake.query;

  if (!room) {
    return;
  }

  const game = await this.gameModel.findById(room);
  const gamePlayers = game.players.map((p) => ({
    ...p,
    step: p._id.toString() === player_id.toString() ? 0 : p.step,
  }));
  game.players = gamePlayers;

  if (
    !game.players.some(
      (p) =>
        Boolean(p.hunter) !== Boolean(game.hide) &&
        p.step > 0 &&
        !Boolean(p.caught) &&
        !Boolean(p.leave),
    )
  ) {
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

    clearInterval(this.TIME_INTERVAL[room]);
    this.TIMER_RUN[room] = new Date().getTime();
    this.TIME_INTERVAL[room] = undefined;

    this.server.in(room).emit('update_game', { game });
    this.server.in(room).emit('timer', { time: new Date().getTime() });

    this.changeTurnOrder(room, timeStep);
  } else {
    await game.save();

    this.server.in(room).emit('update_game', { game });
  }
};
