import { Controller, Get, Post, Body } from '@nestjs/common';

import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly game: GameService) {}

  @Get('/')
  getUsers() {
    return this.game.getGame();
  }

  @Post('/create')
  createGame(@Body() playerCreator: { nickname: string; _id: string }) {
    return this.game.createGame(playerCreator);
  }
}
