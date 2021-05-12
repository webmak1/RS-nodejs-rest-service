import { Database } from '../db/database.js';
import { User } from './user.model.js';

export class UserRepository {
  constructor() {
    this.db = new Database();
  }

  async getAll() {
    return this.db.getUsers();
  }

  async create(user) {
    return this.db.addUser(new User(user));
  }

  async getById(id) {
    return this.db.getUserById(id);
  }

  async update(user) {
    return this.db.updateUser(user);
  }

  async deleteUser(id) {
    await this.db.deleteUser(id);
  }
}
