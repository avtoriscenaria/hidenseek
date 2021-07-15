import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { JWTMiddleware } from '../../middlewares/jwt.middleware';
import { GameGateway } from './game.gateway';

@Module({
  imports: [MongooseModule.forFeature([])],
  controllers: [GameController],
  providers: [GameService, GameGateway],
})
export class GameModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('game');
  }
}
