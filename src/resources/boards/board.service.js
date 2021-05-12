import { BoardRepository } from './board.memory.repository.js';

export class BoardService {
  constructor() {
    this.boardRepository = new BoardRepository();
  }

  async getAll() {
    return this.boardRepository.getAll();
  }
}