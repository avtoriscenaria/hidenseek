import { Injectable } from '@nestjs/common';

import { STATUSES } from 'src/constants';

@Injectable()
export class Response {
  prepare(info) {
    return {
      status: STATUSES.success,
      ...info,
    };
  }
}
