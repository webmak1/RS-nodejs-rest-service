import { Router } from 'express';
import { BoardService } from './board.service.js';
import { Message } from '../../common/const.js';

export class BoardController {
  constructor() {
    this.boardService = new BoardService();
    this.router = Router();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
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

  async update(req, res, next) {
    const { id } = req.params;
    const board = req.body;
    try {
      await this.boardService.update(id, board);
      res.status(200).json({ status: 'success', statusCode: 200, message: Message.BOARD.UPDATED });
    } catch (err) {
      next(err);
    }
  }

  routes() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.create);
    this.router.get('/:id', this.getById);
    this.router.put('/:id', this.update);
  }
}
