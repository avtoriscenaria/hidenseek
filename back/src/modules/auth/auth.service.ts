import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';

import { SignUpPlayerDto, LoginPlayerDto } from './dto';
import { Player, PlayerDocument } from './schemas/player.schema';
import { JWT } from '../common/services/jwt.service';
import { Response } from '../common/services/response.service';
import messages, { STATUSES } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    private jwt: JWT,
    private response: Response,
  ) {}

  async createPlayer(playerDto: SignUpPlayerDto) {
    const { password, nickname: newNickname } = playerDto;
    const nickname = newNickname.trim();

    const player = (await this.playerModel.find({ nickname }).exec())[0];

    let response = {};

    if (player) {
      response = {
        status: STATUSES.failure,
        message: messages.player_exist_warning,
      };
    } else {
      const passwordHashed = await argon2.hash(password);
      const newPlayer = new this.playerModel({
        nickname,
        password: passwordHashed,
      });
      newPlayer.save();

      response = { nickname };
    }
    return this.response.prepare(response);
  }

  async loginPlayer(playerDto: LoginPlayerDto) {
    const { nickname, password } = playerDto;
    const player = (await this.playerModel.find({ nickname }).exec())[0];

    if (player !== undefined) {
      const isPasswordCorrect = await argon2.verify(player.password, password);

      if (isPasswordCorrect) {
        const token = await this.jwt.generateToken(player);

        return this.response.prepare({ data: { user: { nickname }, token } });
      } else {
        return this.response.prepare({
          status: STATUSES.failure,
          message: messages.invalid_nickname_or_password,
        });
      }
    }

    return this.response.prepare({
      status: STATUSES.failure,
      message: messages.invalid_nickname_or_password,
    });
  }
}
