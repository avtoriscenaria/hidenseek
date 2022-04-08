import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Player, PlayerDocument } from 'src/modules/auth/schemas/player.schema';
import { Game, GameDocument } from 'src/modules/game/schemas/game.schema';

@Injectable()
export class DataBase {
  constructor(
    //@InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Player.name) private playerModal: Model<PlayerDocument>,
  ) {}

  private getModal(dbName) {
    switch (dbName) {
      case 'player':
        return this.playerModal;
      // case 'game':
      //   return this.gameModel;
      default:
        break;
    }
  }

  public async getFromDBById(dbName: string, id: string) {
    const db = this.getModal(dbName);

    if (db) {
      return await db.findById(id);
    }
  }

  public async getFromDBByParams(
    dbName: string,
    params: { [key: string]: any },
  ) {
    const db = this.getModal(dbName);

    if (db) {
      return await db.findOne(params);
      //return (await db.find(params).exec())[0];
    }
  }
}
