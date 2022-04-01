import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameGateway } from './socket/game.gateway';
import { GameSocketService } from './socket/game.socket.service';
import { JWT } from '../common/services/jwt.service';
import { Game, GameSchema } from './schemas/game.schema';
import { Player, PlayerSchema } from '../auth/schemas/player.schema';
import { Response } from '../common/services/response.service';
import { DataBase } from '../common/services/database.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [],
  providers: [GameGateway, GameSocketService, JWT, Response, DataBase],
})
export class GameModule {}
