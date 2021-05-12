import { BoardRepository } from './board.memory.repository.js';
import { ErrorHandler } from '../../middlewares/error.js';

export class BoardService {
  constructor() {
    this.boardRepository = new BoardRepository();
  }

  async getAll() {
    return this.boardRepository.getAll();
  }

  async create(board) {
    return this.boardRepository.create(board);
  }

  async getById(id) {
    const board = await this.boardRepository.getById(id);
    if (!board) {
      throw new ErrorHandler(404, `Board with id ${id} not found`);
    }
    return board;
  }
}
