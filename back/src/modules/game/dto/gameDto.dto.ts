import { IsBoolean, IsString, IsArray, IsObject } from 'class-validator';

import { GamePlayerDto } from './gamePlayerDto.dto';

export class GameDto {
  @IsString()
  status: string;

  @IsBoolean()
  hide: boolean;

  @IsObject()
  settings: { hunterStep: number; preyStep: number };

  @IsArray()
  players: GamePlayerDto[];
}
