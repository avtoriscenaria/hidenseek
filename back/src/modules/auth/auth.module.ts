import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DataBase, JWT, Response } from 'src/common/services';
import { JWTMiddleware } from 'src/middlewares';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Player, PlayerSchema } from './schemas/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWT, Response, DataBase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('/auth/get_player');
  }
}
