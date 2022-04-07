import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DataBase, JWT, Response } from 'src/common/services';

import { Game, GameSchema } from './schemas/game.schema';
import { GameGateway } from './socket/game.gateway';
import { GameSocketService } from './socket/game.socket.service';
import { Player, PlayerSchema } from '../auth/schemas/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [],
  providers: [GameGateway, GameSocketService, JWT, Response, DataBase],
})
export class GameModule {}
