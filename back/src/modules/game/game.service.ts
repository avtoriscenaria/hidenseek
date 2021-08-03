import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, STATES } from 'mongoose';

import messages, { GAME_STATUSES, STATUSES } from 'src/constants';

import { Response } from '../common/services/response.service';
import { Game, GameDocument } from './schemas/game.schema';
import { Player, PlayerDocument } from '../auth/schemas/player.schema';
import getPlayerStartPlace from 'src/utils/getPlayerStartPlace';
import getPlayerColor from 'src/utils/getPlayerColor';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    private response: Response,
  ) {}

  async getGame(_id) {
    const game = (await this.gameModel.find({ _id }).exec())[0];

    if (game === undefined) {
      return this.response.prepare({
        status: STATUSES.failure,
        message: messages.game_not_exist,
      });
    }

    return this.response.prepare({ data: { game } });
  }

  async createGame(playerCreator) {
    const { nickname, _id } = playerCreator;
    const position = getPlayerStartPlace();

    const newGame = new this.gameModel({
      status: GAME_STATUSES.start,
      hide: true,
      players: [{ nickname, _id, creator: true, position }],
    });
    newGame.save();

    const player = (await this.playerModel.find({ nickname }).exec())[0];

    player.game_id = newGame._id;
    player.save();

    return this.response.prepare({ data: { game: newGame } });
  }

  async findGame(findGameData) {
    const { gameKey, player_id } = findGameData;
    const player = (await this.playerModel.find({ _id: player_id }).exec())[0];

    const responseData = { status: STATUSES.success, message: '', data: {} };

    if (player) {
      if (player.game_id) {
        responseData.status = STATUSES.failure;
        responseData.message = 'GAME_EXIST';
      } else if (gameKey !== undefined) {
        const game = (await this.gameModel.find({ _id: gameKey }).exec())[0];

        if (game) {
          if (game.players.length >= 6) {
            responseData.status = STATUSES.failure;
            responseData.message = 'GAME_PlAYERS_SIZE_OVERATE';
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
              creator: false,
              hunter: false,
              cached: false,
            };

            game.players = [...game.players, gamePlayer];
            await game.save();

            player.game_id = game._id;
            await player.save();

            responseData.data = { game };
          } else {
            responseData.status = STATUSES.failure;
            responseData.message = 'GAME_IN_PROGRESS';
          }
        } else {
          responseData.status = STATUSES.failure;
          responseData.message = 'GAME_NOT_EXIST';
        }
      } else {
        responseData.status = STATUSES.failure;
        responseData.message = 'GAME_KEY_UNDEFINED';
      }
    } else {
      responseData.status = STATUSES.failure;
      responseData.message = messages.player_exist_warning;
    }
    return this.response.prepare(responseData);
  }
}
