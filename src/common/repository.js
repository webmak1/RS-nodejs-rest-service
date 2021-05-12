import { database } from '../resources/db/database.js';

export class Repository {
  constructor() {
    this.db = database;
  }
}
