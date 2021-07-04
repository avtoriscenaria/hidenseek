import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpPlayerDto } from './dto/signUpPlayerDto.dto';

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

    return { message: 'SUCCESS!' }; //newPlayer.save();
  }
}
