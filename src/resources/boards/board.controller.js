import { Router } from 'express';
import { BoardService } from './board.service.js';
import { Message } from '../../common/const.js';

export class BoardController {
  constructor() {
    this.boardService = new BoardService();
    this.router = Router();
    this.routes();
  }

  getAll = async (req, res) => {
    const boards = await this.boardService.getAll();
    res.json(boards);
  }

  create = async (req, res) => {
    const board = await this.boardService.create(req.body);
    res.status(201).json(board);
  }

  getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const board = await this.boardService.getById(id);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }

  update = async (req, res, next) => {
    const { id } = req.params;
    const board = req.body;
    try {
      await this.boardService.update(id, board);
      res
        .status(200)
        .json({
          status: 'success',
          statusCode: 200,
          message: Message.BOARD.UPDATED,
        });
    } catch (err) {
      next(err);
    }
  }

  delete = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.boardService.deleteBoard(id);
      res
        .status(200)
        .json({
          status: 'success',
          statusCode: 200,
          message: Message.BOARD.DELETED,
        });
    } catch (err) {
      next(err);
    }
  }

  routes() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.create);
    this.router.get('/:id', this.getById);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
