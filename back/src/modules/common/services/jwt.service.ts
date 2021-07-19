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

  async checkAuthToken({ token }) {
    try {
      jwt.verify(token, SECRET);
      return true;
    } catch (e) {
      return false;
    }
  }
}
