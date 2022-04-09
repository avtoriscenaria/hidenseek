import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io';

import { GAME_STATUSES } from 'src/constants';
import { getPlayerColor, getPlayerStartPlace } from 'src/utils';

export const createGame = async function (client: Socket, player) {
  const { _id: player_id } = player;

  const position = getPlayerStartPlace();
  const color = getPlayerColor();

  const newGameData = {
    status: GAME_STATUSES.start,
    hide: true,
    players: [
      {
        nickname: player.nickname,
        _id: player_id,
        creator: true,
        position,
        color,
        online: true,
      },
    ],
    gameKey: uuidv4(),
    settings: { hunterStep: 3, preyStep: 2 },
  };

  const newGame = await this.gameModel.create(newGameData);

  const playerData = {
    game_id: newGame._id,
  };

  await this.playerModel.update({ _id: player._id }, playerData);

  client.join(newGame._id);

  client.handshake.query.room = newGame._id.toString();

  this.server.in(newGame._id).emit('update_game', { game: newGame });
};
