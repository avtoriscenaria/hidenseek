import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { SECRET, EXPIRATION_JWT } from '../../../constants';

@Injectable()
export class JWT {
  constructor() {}

  async generateToken(user) {
    const data = {
      _id: user._id,
      name: user.nickname,
    };
    const signature = SECRET;
    const expiration = EXPIRATION_JWT;

    return jwt.sign({ data }, signature, { expiresIn: expiration });
  }

  private getTokenFromHeader(headers) {
    if (
      headers.authorization &&
      headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return headers.authorization.split(' ')[1];
    }
  }

  async checkAuthToken({ headers }) {
    const token = this.getTokenFromHeader(headers);

    const isVerified = jwt.verify(token, SECRET);

    console.log('isVerified', isVerified);
  }
}
