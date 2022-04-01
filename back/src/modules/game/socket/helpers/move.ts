import { Socket } from 'socket.io';
import { GAME_STATUSES } from 'src/constants';

export const move = async function (client: Socket, payload) {
  const { player_id } = client.handshake.query;
  const { coordinates, game_id: room } = payload;

  if (!room) {
    return;
  }

  const game = await this.gameModel.findById(room);

  if (game) {
    const gamePlayer = game.players.find(
      (p) => p._id.toString() === player_id.toString(),
    );

    if (
      gamePlayer &&
      Boolean(gamePlayer.hunter) !== Boolean(game.hide) &&
      Boolean(gamePlayer.step) &&
      coordinates.x &&
      coordinates.y
    ) {
      const isPlayerOnPosition = game.players.some(
        (p) => p.position.x === coordinates.x && p.position.y === coordinates.y,
      );

      if (!isPlayerOnPosition || gamePlayer.hunter) {
        game.players = game.players.map((p) =>
          p._id.toString() === player_id.toString()
            ? {
                ...p,
                position: coordinates,
                step: p.step - 1 >= 0 ? p.step - 1 : 0,
              }
            : gamePlayer.hunter &&
              p.position.x === coordinates.x &&
              p.position.y === coordinates.y
            ? { ...p, caught: true }
            : p,
        );

        if (
          gamePlayer.hunter &&
          !game.players.some((p) => !Boolean(p.hunter) && !Boolean(p.caught))
        ) {
          game.players = game.players.map((p) =>
            p.hunter ? { ...p, won: true } : p,
          );

          game.status = GAME_STATUSES.finished;

          clearInterval(this.TIME_INTERVAL[room]);

          this.TIMER_RUN[room] = undefined;
          clearInterval(this.TIME_INTERVAL[room]);
          this.TIME_INTERVAL[room] = undefined;
        }

        await game.save();

        this.server.in(room).emit('update_game', { game });
      }
    }
  }
};
