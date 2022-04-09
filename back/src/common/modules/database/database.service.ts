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
    return await this.database.findOne({ _id: new mongodb.ObjectID(id) });
  };

  getAll = async () => {
    return await this.database.find({}).toArray();
  };

  create = async (data) => {
    return (await this.database.insertOne(data)).ops[0];
  };

  update = async (uniqParam, newData, unsetParams = {}) => {
    if (uniqParam._id) {
      uniqParam._id = new mongodb.ObjectID(uniqParam._id);
    }
    return (
      await this.database.findOneAndUpdate(
        uniqParam,
        {
          $set: newData,
          $unset: unsetParams,
        },
        { returnDocument: 'after' },
      )
    ).value;
  };
}
