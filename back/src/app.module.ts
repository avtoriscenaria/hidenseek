import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppGateway } from './app.gateway';
import { MONGO_URI } from './constants';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), AuthModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
