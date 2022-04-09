import { Socket } from 'socket.io';

export const getGame = async function (client: Socket) {
  const { room } = client.handshake.query;

  if (!room) {
    return;
  }

  const game = await this.gameModel.getById(room);

  this.server.in(room).emit('update_game', { game });
};
