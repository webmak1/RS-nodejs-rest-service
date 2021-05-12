import { TaskRepository } from './task.memory.repository.js';
import { BoardService } from '../boards/board.service.js';
import { ErrorHandler } from '../../middlewares/error.js';

export class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
    this.boardService = new BoardService();
  }

  async getAll(boardId) {
    await this.boardService.getById(boardId);
    return this.taskRepository.getAll(boardId);
  }

  async create(boardId, task) {
    const board = await this.boardService.getById(boardId);
    if (board.columns.length && !board.columns.some(column => column.id === task.columnId)) {
      throw new ErrorHandler(404, `Column with id ${task.columnId} not found`);
    }
    return this.taskRepository.create({...task, boardId});
  }
}
