import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  constructor() {}

  async getGame() {
    console.log('GET GAME');
    return { message: 'GET_GAME' };
  }

  async createGame(createGameDto: any) {
    console.log(createGameDto);
    return { message: 'check' };
  }
}
