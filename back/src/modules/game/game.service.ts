import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import messages, { GAME_STATUSES, STATUSES } from 'src/constants';

import { Response } from '../common/services/response.service';
import { Game, GameDocument } from './schemas/game.schema';
import { Player, PlayerDocument } from '../auth/schemas/player.schema';
import getPlayerStartPlace from '../common/utils/getPlayerStartPlace';

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
}
