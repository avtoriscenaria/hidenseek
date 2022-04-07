import { Socket } from 'socket.io';

import { GAME_STATUSES } from 'src/constants';

import { getPlayerColor, getPlayerStartPlace } from 'src/utils';

export const findGame = async function (client: Socket, player, gameKey) {
  const { _id: player_id } = player;

  if (player.game_id) {
    client.emit('warning_message', { warningMessage: 'GAME_EXIST' });
  } else {
    let game;
    if (Boolean(gameKey)) {
      game = (await this.gameModel.find({ gameKey }).exec())[0];
    } else {
      const games = await this.gameModel.find().exec();
      game = games.find(
        (g) => g.status === GAME_STATUSES.start && g.players.length < 6,
      );
    }

    if (game) {
      const exitPlayer = game.players.some(
        (p) => p._id.toString() === player_id.toString(),
      );

      if (Boolean(exitPlayer)) {
        player.game_id = game._id;
        await player.save();
      } else if (game.players.length >= 6) {
        client.emit('warning_message', {
          warningMessage: 'GAME_PlAYERS_SIZE_OVERATE',
        });
      } else if (game.status === GAME_STATUSES.start) {
        const position = getPlayerStartPlace(
          game.players.map((p) => p.position),
        );
        const color = getPlayerColor(game.players.map((p) => p.color));

        const gamePlayer = {
          _id: player._id,
          nickname: player.nickname,
          color,
          position,
          step: 0,
          creator: false,
          hunter: false,
          caught: false,
          online: true,
        };

        game.players = [...game.players, gamePlayer];
        await game.save();

        player.game_id = game._id;
        await player.save();

        client.join(game._id);

        client.handshake.query.room = game._id.toString();

        this.server.in(game._id).emit('update_game', { game });
      } else {
        client.emit('warning_message', {
          warningMessage: 'GAME_IN_PROGRESS',
        });
      }
    } else {
      client.emit('warning_message', {
        warningMessage: 'GAME_NOT_EXIST',
      });
    }
  }
};
