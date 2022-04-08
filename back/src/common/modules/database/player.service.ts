import { DBService } from './database.service';

export class PlayerDBService extends DBService {
  constructor(db) {
    super(db);
    this.initialize('players');
  }
}
