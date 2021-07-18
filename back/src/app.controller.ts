import { Controller, Get } from '@nestjs/common';
import { STATUSES } from './constants';

@Controller('app')
export class AppController {
  constructor() {}

  @Get('/')
  verifyJWT() {
    return { status: STATUSES.success };
  }
}
