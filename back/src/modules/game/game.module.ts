import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { JWTMiddleware } from '../../middlewares/jwt.middleware';

@Module({
  imports: [MongooseModule.forFeature([])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('game');
  }
}
