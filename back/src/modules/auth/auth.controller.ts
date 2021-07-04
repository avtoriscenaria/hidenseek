import { Controller, Get, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpPlayerDto } from './dto/signUpPlayerDto.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('/')
  getUsers() {
    return this.auth.getAll();
  }

  @Post('/sign_up')
  createPlayer(@Body() signUpPlayerDto: SignUpPlayerDto) {
    return this.auth.createPlayer(signUpPlayerDto);
  }
}
