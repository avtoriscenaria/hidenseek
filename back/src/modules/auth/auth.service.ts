import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    //const newPlayer = new this.playerModel(playerDto);

    return { message: 'SIGN_UP' }; //newPlayer.save();
  }

  async loginPlayer(playerDto: LoginPlayerDto) {
    console.log(playerDto);
    const player = await this.playerModel.find(playerDto).exec();
    console.log(player);

    return { message: 'LOGIN' };
  }
}
