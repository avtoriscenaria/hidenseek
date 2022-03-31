import { Socket } from 'socket.io';

export const leave = async function (client: Socket, { game_id: room }) {
  const { player_id } = client.handshake.query;

  if (!room) {
    return;
  }

  const game = await this.gameModel.findById(room);

  game.players = game.players.map((p) =>
    p._id === player_id ? { ...p, leave: true } : p,
  );

  game.save();

  const player = await this.playerModal.findById(player_id);

  player.game_id = undefined;

  player.save();

  client.leave(room);
  client.emit('leave_game');
  this.server.in(room).emit('update_game', { game });
};
