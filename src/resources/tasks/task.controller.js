import { Router } from 'express';
import { TaskService } from './task.service.js';
import { Message } from '../../common/const.js';

export class TaskController {
  constructor() {
    this.taskService = new TaskService();
    this.router = Router({ mergeParams: true });
    this.routes();
  }

  getAll = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const tasks = await this.taskService.getAll(boardId);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const taskDto = req.body;
      const tasks = await this.taskService.create(boardId, taskDto);
      res.status(201).json(tasks);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id, boardId } = req.params;
      const task = await this.taskService.getById(id, boardId);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id, boardId } = req.params;
      const taskDto = req.body;
      const task = await this.taskService.update(id, boardId, taskDto);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id, boardId } = req.params;
      await this.taskService.delete(id, boardId);
      res
        .status(200)
        .json({
          status: 'success',
          statusCode: res.statusCode,
          message: Message.TASK.DELETED,
        });
    } catch (err) {
      next(err);
    }
  };

  routes() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.create);
    this.router.get('/:id', this.getById);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
