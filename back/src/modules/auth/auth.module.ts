import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JWTMiddleware } from 'src/middlewares/jwt.middleware';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Player, PlayerSchema } from './schemas/player.schema';
import { JWT } from '../common/services/jwt.service';
import { Response } from '../common/services/response.service';
import { DataBase } from '../common/services/database.service';

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
