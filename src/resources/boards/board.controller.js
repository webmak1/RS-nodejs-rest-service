import { Router } from 'express';
import { BoardService } from './board.service.js';

export class BoardController {
  constructor() {
    this.boardService = new BoardService();
    this.router = Router();
    this.getAll = this.getAll.bind(this);
    this.routes();
  }

  async getAll(req, res) {
    const boards = await this.boardService.getAll();
    res.json(boards);
  }

  routes() {
    this.router.get('/', this.getAll);
  }
}
