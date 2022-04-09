import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { JWT, Response } from 'src/common/services';
import messages, { DATABASE_CONNECTION, STATUSES } from 'src/constants';

import { SignUpPlayerDto, LoginPlayerDto } from './dto';
import { Player, PlayerDocument } from './schemas/player.schema';

import * as mongodb from 'mongodb';
import { PlayerDBService } from 'src/common/modules/database/player.service';

@Injectable()
export class AuthService {
  constructor(
    private playerModel: PlayerDBService,
    private jwt: JWT,
    private response: Response,
  ) {}

  async createPlayer(playerDto: SignUpPlayerDto) {
    const { password, nickname: newNickname } = playerDto;
    const nickname = newNickname.trim();
    const player = await this.playerModel.get({ nickname });

    let response = {};

    if (Boolean(player)) {
      response = {
        status: STATUSES.failure,
        message: messages.player_exist_warning,
      };
    } else {
      const passwordHashed = await argon2.hash(password);
      await this.playerModel.create({
        nickname,
        password: passwordHashed,
      });
      response = { data: { nickname } };
    }
    return this.response.prepare(response);
  }

  async loginPlayer(playerDto: LoginPlayerDto) {
    const { nickname, password } = playerDto;

    const player = await this.playerModel.get({ nickname });
    if (player !== undefined) {
      const isPasswordCorrect = await argon2.verify(player.password, password);

      if (isPasswordCorrect) {
        const token = await this.jwt.generateToken(player);
        const { admin, _id, game_id } = player;
        return this.response.prepare({
          data: { player: { nickname, admin, _id, game_id }, token },
        });
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

  async getPlayer(nickname: string, request: Request) {
    const { nickname: jwtNickname, _id } = await this.jwt.decodeAuthToken(
      request,
    );
    if (jwtNickname === nickname) {
      const player = await this.playerModel.get({ nickname });
      if (player !== undefined && player._id.toString() === _id.toString()) {
        const { admin, _id, game_id } = player;
        return this.response.prepare({
          status: STATUSES.success,
          data: { player: { nickname, admin, _id, game_id } },
        });
      }
    }
    return this.response.prepare({
      status: STATUSES.not_authorized,
    });
  }
}
