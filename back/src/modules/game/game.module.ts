import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';

@Module({
  imports: [MongooseModule.forFeature([])],
  controllers: [GameController],
  providers: [GameService, GameGateway],
})
export class GameModule {}
