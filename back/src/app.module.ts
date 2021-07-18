import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JWTMiddleware } from './middlewares/jwt.middleware';
import { MONGO_URI } from './constants';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), AuthModule, GameModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('app');
  }
}
