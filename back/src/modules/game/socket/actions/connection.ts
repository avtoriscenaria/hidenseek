import { Socket } from 'socket.io';

import { GAME_STATUSES } from 'src/constants';

export const connection = async function (client: Socket) {
  const { room, player_id } = client.handshake.query;

  if (!room) {
    return;
  }

  if (Boolean(room) && player_id) {
    const game = await this.gameModel.getById(room);

    if (game) {
      if (
        game.status === GAME_STATUSES.start ||
        game.status === GAME_STATUSES.in_process
      ) {
        const gamePlayer = game.players.find(
          (p) => p._id.toString() === player_id.toString(),
        );

        if (gamePlayer) {
          const newData = {
            players: game.players.map((p) =>
              p._id.toString() === player_id.toString()
                ? { ...p, online: true }
                : p,
            ),
          };

          await this.gameModel.update({ _id: room }, newData);

          client.join(room);

          if (game.status === GAME_STATUSES.in_process) {
            if (Boolean(this.TIMER_RUN[room])) {
              const startTime = Math.round(
                (new Date().getTime() - this.TIMER_RUN[room]) / 1000,
              );
              client.emit('timer', {
                startTime,
              });
            } else {
              client.emit('timer', {
                startTime: 0,
              });
              this.changeTurnOrder(room, 20000);
            }
          }
        }

        this.server.in(room).emit('update_game', { game, isLoaded: true });
      } else {
        const player = await this.playerModal.getById(player_id);

        const newData = {
          games_played: [...player.games_played, player.game_id],
        };

        const removeData = {
          game_id: undefined,
        };

        await this.playerModal.update({ _id: player_id }, newData, removeData);

        client.leave(room);
      }
    }
  }
};
