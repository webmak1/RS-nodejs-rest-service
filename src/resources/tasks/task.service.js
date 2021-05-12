import { TaskRepository } from './task.memory.repository.js';
import { BoardService } from '../boards/board.service.js';

export class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
    this.boardService = new BoardService();
  }

  async getAll(boardId) {
    await this.boardService.getById(boardId);
    return this.taskRepository.getAll(boardId);
  }
}
