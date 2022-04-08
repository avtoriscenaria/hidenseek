import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/common/modules/database/database.module';
import { GameDBService } from 'src/common/modules/database/game.service';
import { PlayerDBService } from 'src/common/modules/database/player.service';
import { JWT, Response } from 'src/common/services';

import { GameGateway } from './socket/game.gateway';
import { GameSocketService } from './socket/game.socket.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    GameGateway,
    GameSocketService,
    JWT,
    Response,
    PlayerDBService,
    GameDBService,
  ],
})
export class GameModule {}
