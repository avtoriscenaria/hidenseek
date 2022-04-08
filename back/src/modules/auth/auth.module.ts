import { MiddlewareConsumer, Module } from '@nestjs/common';

import { DatabaseModule } from 'src/common/modules/database/database.module';
import { PlayerDBService } from 'src/common/modules/database/player.service';
import { JWT, Response } from 'src/common/services';
import { JWTMiddleware } from 'src/middlewares';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, JWT, Response, PlayerDBService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('/auth/get_player');
  }
}
