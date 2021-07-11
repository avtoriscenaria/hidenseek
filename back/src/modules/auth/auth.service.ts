import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';

import { SignUpPlayerDto, LoginPlayerDto } from './dto';
import { Player, PlayerDocument } from './schemas/player.schema';
import { JWT } from '../common/services/jwt.service';
import { Responce } from '../common/services/responce.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    private jwt: JWT,
    private responce: Responce,
  ) {}

  async createPlayer(playerDto: SignUpPlayerDto) {
    const { password, nickname } = playerDto;
    const passwordHashed = await argon2.hash(password);
    const newPlayer = new this.playerModel({
      nickname,
      password: passwordHashed,
      admin: true,
    });
    newPlayer.save();
    return { nickname };
  }

  async loginPlayer(playerDto: LoginPlayerDto) {
    const { nickname, password } = playerDto;
    const player = (await this.playerModel.find({ nickname }).exec())[0];

    if (player !== undefined) {
      const isPasswordCorrect = await argon2.verify(player.password, password);

      if (isPasswordCorrect) {
        const token = await this.jwt.generateToken(player);

        return this.responce.prepare({ data: { user: { nickname }, token } });
      } else {
        return this.responce.prepare({
          status: 'failure',
          message: 'Nickname or Password was wrong',
        });
      }
    }

    return this.responce.prepare({
      status: 'failure',
      message: 'Nickname or Password was wrong',
    });
  }
}
