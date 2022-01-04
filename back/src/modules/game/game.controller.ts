import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly game: GameService) {}

  @Get('/exit/:player_id')
  exitGame(@Param() { player_id }: { player_id: ObjectId }) {
    return this.game.exitGame(player_id);
  }

  @Get('/:game_id/:player_id')
  getGame(
    @Param() { game_id, player_id }: { game_id: ObjectId; player_id: ObjectId },
  ) {
    return this.game.getGame(game_id, player_id);
  }

  @Post('/create')
  createGame(@Body() playerCreator: { nickname: string; _id: string }) {
    return this.game.createGame(playerCreator);
  }

  @Post('/find')
  findGame(@Body() findGameData: { gameKey: string; player_id: string }) {
    console.log('FIND GAME', findGameData);
    return this.game.findGame(findGameData);
  }
}
