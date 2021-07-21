import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GAME_STATUSES } from 'src/constants';

import { Response } from '../common/services/response.service';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    private response: Response,
  ) {}

  async getGame() {
    console.log('GET GAME');
    return { message: 'GET_GAME' };
  }

  async createGame(playerCreator) {
    const { nickname, _id } = playerCreator;

    const newGame = new this.gameModel({
      status: GAME_STATUSES.start,
      hide: true,
      players: [{ nickname, _id, creator: true }],
    });
    newGame.save();

    return this.response.prepare({ data: newGame });
  }
}
