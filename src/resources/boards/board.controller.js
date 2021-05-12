import { Router } from 'express';
import { BoardService } from './board.service.js';

export class BoardController {
  constructor() {
    this.boardService = new BoardService();
    this.router = Router();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.routes();
  }

  async getAll(req, res) {
    const boards = await this.boardService.getAll();
    res.json(boards);
  }

  async create(req, res) {
    const board = await this.boardService.create(req.body);
    res.status(201).json(board);
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const board = await this.boardService.getById(id);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }

  routes() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.create);
    this.router.get('/:id', this.getById);
  }
}
