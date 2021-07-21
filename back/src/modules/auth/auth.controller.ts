import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpPlayerDto, LoginPlayerDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/sign_up')
  createPlayer(@Body() signUpPlayerDto: SignUpPlayerDto) {
    return this.auth.createPlayer(signUpPlayerDto);
  }

  @Post('/login')
  loginPlayer(@Body() loginPlayerDto: LoginPlayerDto) {
    return this.auth.loginPlayer(loginPlayerDto);
  }

  @Get('/get_player/:nickname')
  getPlayer(@Req() request, @Param() params: { nickname: string }) {
    const { nickname } = params;
    return this.auth.getPlayer(nickname, request);
  }
}
