import { Controller, Get, Post, Body } from '@nestjs/common';

import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly game: GameService) {}

  @Get('/')
  getUsers() {
    return this.game.getGame();
  }
}
