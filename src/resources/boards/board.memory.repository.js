import { Database } from '../db/database.js';

export class BoardRepository {
  constructor() {
    this.db = new Database();
  }

  async getAll() {
    return this.db.getBoards();
  }
}
