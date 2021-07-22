import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly game: GameService) {}

  @Get('/:game_id')
  getUsers(@Param() { game_id }: { game_id: ObjectId }) {
    return this.game.getGame(game_id);
  }

  @Post('/create')
  createGame(@Body() playerCreator: { nickname: string; _id: string }) {
    return this.game.createGame(playerCreator);
  }
}
