import { IsBoolean, IsString, IsArray } from 'class-validator';

import { GamePlayerDto } from './gamePlayerDto.dto';

export class GameDto {
  @IsString()
  status: string;

  @IsBoolean()
  hide: boolean;

  @IsArray()
  players: GamePlayerDto[];
}
