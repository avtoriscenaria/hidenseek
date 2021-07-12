import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Player, PlayerSchema } from './schemas/player.schema';
import { JWT } from '../common/services/jwt.service';
import { Response } from '../common/services/response.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWT, Response],
})
export class AuthModule {}
