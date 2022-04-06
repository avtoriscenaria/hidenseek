import { Socket } from 'socket.io';
import { GAME_STATUSES } from 'src/constants';
import { playerLeaveGame } from '../helpers';

export const leave = async function (client: Socket, { game_id: room }) {
  const { player_id } = client.handshake.query;

  if (!room) {
    return;
  }

  const game = await this.gameModel.findById(room);

  const selectedPlayer = game.players.find(
    (p) => p._id.toString() === player_id.toString(),
  );

  if (selectedPlayer) {
    const playersLength = game.players.filter((p) => !p.leave).length;

    if (game.status === GAME_STATUSES.start) {
      game.players = game.players.filter(
        (p) => p._id.toString() !== player_id.toString(),
      );
    } else if (game.status === GAME_STATUSES.in_process) {
      game.players = game.players.map((p) =>
        p._id.toString() === player_id.toString()
          ? { ...p, leave: true, online: false }
          : p,
      );
    }

    await playerLeaveGame(this.playerModal, player_id);
    client.leave(room);
    client.handshake.query.room = '';
    client.emit('leave_game');

    if (
      (selectedPlayer.creator && game.status === GAME_STATUSES.start) ||
      (selectedPlayer.hunter && game.status === GAME_STATUSES.in_process) ||
      playersLength === 1
    ) {
      game.status = GAME_STATUSES.delete;
      await game.save();
      if (playersLength > 1) {
        for (let p of game.players) {
          await playerLeaveGame(this.playerModal, p._id);
        }

        this.server.in(room).emit('leave_game');
      }
      this.TIMER_RUN[room] = undefined;
      clearInterval(this.TIME_INTERVAL[room]);
      this.TIME_INTERVAL[room] = undefined;
    } else {
      await game.save();

      this.server.in(room).emit('update_game', { game });
    }
  }
};
