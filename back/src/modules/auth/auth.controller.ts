import {
  Controller,
  HttpStatus,
  Get,
  Query,
  HttpException,
  Session,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('/')
  getUsers() {
    return this.auth.getAll();
  }
}
