import { IsString } from 'class-validator';

export class LoginPlayerDto {
  @IsString()
  nickName: string;

  @IsString()
  password: string;
}
