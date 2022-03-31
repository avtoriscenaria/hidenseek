import { Socket } from 'socket.io';
import { GAME_STATUSES } from 'src/constants';

export const move = async function (client: Socket, payload) {
  const { player_id } = client.handshake.query;
  const { coordinates, game_id: room } = payload;

  if (!room) {
    return;
  }

  console.log('PROCESS...');
  const game = await this.gameModel.findById(room);

  if (game) {
    console.log('1');
    const gamePlayer = game.players.find(
      (p) => p._id.toString() === player_id.toString(),
    );

    console.log('2');
    if (
      gamePlayer &&
      Boolean(gamePlayer.hunter) !== Boolean(game.hide) &&
      Boolean(gamePlayer.step) &&
      coordinates.x &&
      coordinates.y
    ) {
      console.log('3');
      const isPlayerOnPosition = game.players.some(
        (p) => p.position.x === coordinates.x && p.position.y === coordinates.y,
      );

      console.log('4');

      if (!isPlayerOnPosition || gamePlayer.hunter) {
        console.log('5');
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

        console.log('6');

        if (
          gamePlayer.hunter &&
          !game.players.some((p) => !Boolean(p.hunter) && !Boolean(p.caught))
        ) {
          console.log('7');
          game.players = game.players.map((p) =>
            p.hunter ? { ...p, won: true } : p,
          );

          console.log('8');
          game.status = GAME_STATUSES.finished;

          console.log('9');
          clearInterval(this.TIME_INTERVAL[room]);

          console.log('10');
          this.TIMER_RUN[room] = undefined;
          this.TIME_INTERVAL[room] = undefined;
        }

        console.log('SAVEING...');

        await game.save();

        console.log('GAME SAVED AFTER MOVE');

        this.server.in(room).emit('update_game', { game });
      }
    }
  }
};
