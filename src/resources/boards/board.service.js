import { BoardRepository } from './board.memory.repository.js';
import { ErrorHandler } from '../../middlewares/error.js';
import { TaskService } from '../tasks/task.service.js';

export class BoardService {
  constructor() {
    this.boardRepository = new BoardRepository();
    this.taskService = new TaskService();
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

  async update(id, board) {
    const updatedBoard = await this.getById(id);
    updatedBoard.title = board.title;
    updatedBoard.columns = board.columns;
    await this.boardRepository.update(updatedBoard);
  }

  async deleteBoard(id) {
    await this.getById(id);
    await this.boardRepository.deleteBoard(id);
    await this.taskService.removeByBoard(id);
  }
}
