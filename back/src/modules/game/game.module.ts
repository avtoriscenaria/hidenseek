import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { JWT } from '../common/services/jwt.service';
import { Game, GameSchema } from './schemas/game.schema';
import { Response } from '../common/services/response.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  controllers: [GameController],
  providers: [GameService, GameGateway, JWT, Response],
})
export class GameModule {}
