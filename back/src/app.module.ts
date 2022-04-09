import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule, GameModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
