import { IsBoolean, IsString } from 'class-validator';

export class GamePlayerDto {
  @IsString()
  nickname: string;

  @IsString()
  role: string;

  @IsBoolean()
  creator: boolean;

  @IsBoolean()
  catched: boolean;

  @IsString()
  _id: string;
}
