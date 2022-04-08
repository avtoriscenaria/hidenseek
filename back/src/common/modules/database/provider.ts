import * as mongodb from 'mongodb';
import { DATABASE_CONNECTION } from 'src/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<mongodb.Db> => {
      try {
        const client = await mongodb.MongoClient.connect(
          process.env.MONGO_URI,
          {
            useUnifiedTopology: true,
          },
        );
        const db = client.db(process.env.DB_NAME);

        return db;
      } catch (error) {
        throw error;
      }
    },
  },
];
