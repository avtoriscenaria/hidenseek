import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWT {
  constructor() {}

  async generateToken(user) {
    const data = {
      _id: user._id,
      nickname: user.nickname,
    };

    const signature = process.env.SECRET;
    const expiration = process.env.EXPIRATION_JWT;

    return jwt.sign({ data }, signature, {
      expiresIn: expiration,
    });
  }

  async checkAuthToken(token) {
    try {
      jwt.verify(token, process.env.SECRET);
      return true;
    } catch (e) {
      return false;
    }
  }

  async decodeAuthToken(req) {
    const token = getTokenFromHeader(req);
    try {
      const verifuedData: string | jwt.JwtPayload = jwt.verify(
        token,
        process.env.SECRET,
      );

      if (typeof verifuedData !== 'string') {
        const { data = {} } = verifuedData;
        return data;
      }
      return {};
    } catch (e) {
      return {};
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
