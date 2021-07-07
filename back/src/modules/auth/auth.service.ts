import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { SignUpPlayerDto, LoginPlayerDto } from './dto';
import { Player, PlayerDocument } from './schemas/player.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}

  async getAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async createPlayer(playerDto: SignUpPlayerDto) {
    const { password, nickname } = playerDto;

    const salt = bcrypt.genSaltSync(11);
    const hash = bcrypt.hashSync(password, salt);
    const newPlayer = new this.playerModel({ nickname, password: hash });
    console.log(newPlayer);
    return newPlayer.save();
    //return { message: 'check' };
  }

  async loginPlayer(playerDto: LoginPlayerDto) {
    const { nickname, password } = playerDto;
    console.log(playerDto);
    const player = (await this.playerModel.find({ nickname }).exec())[0];

    if (player) {
      const confirm = await bcrypt.compare(password, player.password);

      console.log(confirm, password, player);
    }

    return { message: 'LOGIN' };
  }
}
