import { Database } from '../db/database.js';
import { Board } from './board.model.js';

export class BoardRepository {
  constructor() {
    this.db = new Database();
  }

  async getAll() {
    return this.db.getBoards();
  }

  async create(board) {
    return this.db.addBoard(new Board(board));
  }
}
