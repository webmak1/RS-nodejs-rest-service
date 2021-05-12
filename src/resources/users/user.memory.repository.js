import { Database } from '../db/database.js';

export class UserRepository {
  constructor() {
    this.db = new Database();
  }

  async getAll() {
    return this.db.getUsers();
  }
}
