import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import getPlayerStartPlace from 'src/utils/getPlayerStartPlace';
import getPlayerColor from 'src/utils/getPlayerColor';
import messages, { GAME_STATUSES, STATUSES } from 'src/constants';

import { Response } from '../common/services/response.service';
import { Game, GameDocument } from './schemas/game.schema';
import { Player, PlayerDocument } from '../auth/schemas/player.schema';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    private response: Response,
  ) {}

  async getGame(game_id, player_id) {
    const game = await this.gameModel.findById(game_id);

    if (
      !Boolean(game) ||
      game.status === GAME_STATUSES.finished ||
      game.status === GAME_STATUSES.delete
    ) {
      const player = await this.playerModel.findById(player_id);

      if (Boolean(player)) {
        player.game_id = undefined;
        if (Boolean(game)) {
          player.games_played = [...player.games_played, game._id];
        }

        await player.save();
      }

      return this.response.prepare({
        status: STATUSES.failure,
        message: messages.game_not_exist,
      });
    }

    return this.response.prepare({ data: { game } });
  }

  async exitGame(player_id) {
    const player = await this.playerModel.findById(player_id);
    const responseData = {
      status: STATUSES.failure,
      message: 'SOMETHING_WENT_WRONG',
      data: { player: undefined },
    };

    if (Boolean(player)) {
      if (Boolean(player.game_id)) {
        player.games_played = [...player.games_played, player.game_id];
      }

      player.game_id = undefined;

      await player.save();

      responseData.status = STATUSES.success;
      responseData.data.player = player;
    }

    return this.response.prepare(responseData);
  }

  async createGame(playerCreator) {
    const { nickname, _id } = playerCreator;
    const position = getPlayerStartPlace();
    const color = getPlayerColor();

    console.log('COLOR', color);

    const newGame = new this.gameModel({
      status: GAME_STATUSES.start,
      hide: true,
      players: [{ nickname, _id, creator: true, position, color }],
      gameKey: uuidv4(),
      settings: { hunterStep: 3, preyStep: 2 },
    });
    newGame.save();

    const player = (await this.playerModel.find({ nickname }).exec())[0];

    player.game_id = newGame._id;
    player.save();

    console.log('GAME', JSON.stringify(newGame, null, 4));

    return this.response.prepare({ data: { game: newGame } });
  }

  async findGame(findGameData) {
    const { gameKey, player_id } = findGameData;
    const player = await this.playerModel.findById(player_id);

    const responseData = { status: STATUSES.success, message: '', data: {} };

    if (player) {
      if (player.game_id) {
        responseData.status = STATUSES.failure;
        responseData.message = 'GAME_EXIST';
      } else if (gameKey !== undefined) {
        let game;
        if (!Boolean(gameKey)) {
          const games = await this.gameModel.find().exec();
          game = games.find(
            (g) => g.status === GAME_STATUSES.start && g.players.length < 6,
          );
        } else {
          game = (await this.gameModel.find({ gameKey }).exec())[0];
        }

        if (game) {
          const exitPlayer = game.players.some(
            (p) => p._id.toString() === player_id.toString(),
          );

          if (Boolean(exitPlayer)) {
            player.game_id = game._id;
            await player.save();

            responseData.data = { game };
          } else if (game.players.length >= 6) {
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
              step: 0,
              creator: false,
              hunter: false,
              caught: false,
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
