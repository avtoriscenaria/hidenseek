import { Socket } from 'socket.io';

export const endTurn = async function (
  client: Socket,
  { timeStep, game_id: room },
) {
  const { player_id } = client.handshake.query;

  if (!room) {
    return;
  }

  const game = await this.gameModel.getById(room);
  const gamePlayers = game.players.map((p) => ({
    ...p,
    step: p._id.toString() === player_id.toString() ? 0 : p.step,
  }));

  const gameData = {
    players: gamePlayers,
    hide: game.hide,
  };

  if (
    !gameData.players.some(
      (p) =>
        Boolean(p.hunter) !== Boolean(gameData.hide) &&
        p.step > 0 &&
        !Boolean(p.caught) &&
        !Boolean(p.leave),
    )
  ) {
    gameData.hide = !game.hide;
    gameData.players = gameData.players.map((p) => ({
      ...p,
      step:
        Boolean(p.hunter) && !gameData.hide
          ? game.settings.hunterStep
          : !Boolean(p.hunter) && gameData.hide
          ? game.settings.preyStep
          : 0,
    }));

    await this.gameModel.update({ _id: game._id }, gameData);
    clearInterval(this.TIME_INTERVAL[room]);
    this.TIMER_RUN[room] = new Date().getTime();
    this.TIME_INTERVAL[room] = undefined;

    this.server.in(room).emit('update_game', { game });
    this.server.in(room).emit('timer', { time: new Date().getTime() });

    this.changeTurnOrder(room, timeStep);
  } else {
    await this.gameModel.update({ _id: game._id }, gameData);

    this.server.in(room).emit('update_game', { game });
  }
};
