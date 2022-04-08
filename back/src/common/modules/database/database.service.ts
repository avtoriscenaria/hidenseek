import * as mongodb from 'mongodb';
import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_CONNECTION } from 'src/constants';

@Injectable()
export class DBService {
  constructor(@Inject(DATABASE_CONNECTION) private db: mongodb.Db) {}

  protected initialize = (dbName) => {
    this.database = this.db.collection(dbName);
  };

  database;

  get = async (data) => {
    return await this.database.findOne(data);
  };

  getById = async (id) => {
    return await this.database.findById(id);
  };

  create = async (data) => {
    return await this.database.insert(data);
  };

  update = async (uniqParam, newData, unsetParams = {}) => {
    return await this.database.updateOne(uniqParam, {
      $set: newData,
      $unset: unsetParams,
    });
  };
}
