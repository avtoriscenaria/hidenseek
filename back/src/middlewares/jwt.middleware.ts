import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { SECRET, STATUSES } from 'src/constants';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = getTokenFromHeader(req);

    try {
      jwt.verify(token, SECRET);
      next();
    } catch (e) {
      console.log('JWT failure');

      res.send({ status: STATUSES.token_expiration });
    }
  }
}

const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
};
