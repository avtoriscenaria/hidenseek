import { IsString } from 'class-validator';

export class SignUpPlayerDto {
  @IsString()
  nickname: string;

  @IsString()
  password: string;
}
