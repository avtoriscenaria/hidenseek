import { IsString } from 'class-validator';

export class LoginPlayerDto {
  @IsString()
  nickname: string;

  @IsString()
  password: string;
}
