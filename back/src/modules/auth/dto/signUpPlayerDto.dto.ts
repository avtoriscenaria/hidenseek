import { IsString } from 'class-validator';

export class SignUpPlayerDto {
  @IsString()
  nickName: string;

  @IsString()
  password: string;
}
