import { DBService } from './database.service';

export class GameDBService extends DBService {
  constructor(db) {
    super(db);
    this.initialize('games');
  }
}
