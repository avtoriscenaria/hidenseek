import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { JWT } from '../common/services/jwt.service';

@Module({
  imports: [MongooseModule.forFeature([])],
  controllers: [GameController],
  providers: [GameService, GameGateway, JWT],
})
export class GameModule {}
