import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MONGO_URI } from './constants';
import { AuthModule } from './modules/auth/auth.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), AuthModule, GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
