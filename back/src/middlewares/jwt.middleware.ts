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
      console.log('JWT success');
      next();
    } catch (e) {
      console.log('JWT failure');
      // console.log(e.name === 'TokenExpiredError');
      // console.log(e.name === 'JsonWebTokenError');
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
