import { Socket } from 'socket.io';

import { GAME_STATUSES } from 'src/constants';

import { playerLeaveGame } from '../helpers';

export const leave = async function (client: Socket, { game_id: room }) {
  const { player_id } = client.handshake.query;

  if (!room) {
    return;
  }

  const game = await this.gameModel.getById(room);

  const selectedPlayer = game.players.find(
    (p) => p._id.toString() === player_id.toString(),
  );

  if (selectedPlayer) {
    const playersLength = game.players.filter((p) => !p.leave).length;

    const gameData = {
      players: game.players,
      status: game.status,
    };

    if (game.status === GAME_STATUSES.start) {
      gameData.players = gameData.players.filter(
        (p) => p._id.toString() !== player_id.toString(),
      );
    } else if (game.status === GAME_STATUSES.in_process) {
      gameData.players = gameData.players.map((p) =>
        p._id.toString() === player_id.toString()
          ? { ...p, leave: true, online: false }
          : p,
      );
    }

    await playerLeaveGame(this.playerModel, player_id);
    client.leave(room);
    client.handshake.query.room = '';
    client.emit('leave_game');

    if (
      (selectedPlayer.creator && gameData.status === GAME_STATUSES.start) ||
      (selectedPlayer.hunter && gameData.status === GAME_STATUSES.in_process) ||
      playersLength === 1
    ) {
      gameData.status = GAME_STATUSES.delete;
      await this.gameModel.update({ _id: game._id }, gameData);

      if (playersLength > 1) {
        for (let p of game.players) {
          await playerLeaveGame(this.playerModel, p._id);
        }

        this.server.in(room).emit('leave_game');
      }
      this.TIMER_RUN[room] = undefined;
      clearInterval(this.TIME_INTERVAL[room]);
      this.TIME_INTERVAL[room] = undefined;
    } else {
      await this.gameModel.update({ _id: game._id }, gameData);

      this.server.in(room).emit('update_game', { game });
    }
  }
};
