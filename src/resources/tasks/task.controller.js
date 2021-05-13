import { Router } from 'express';
import { TaskService } from './task.service.js';

export class TaskController {
  constructor() {
    this.taskService = new TaskService();
    this.router = Router({ mergeParams: true });
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.routes();
  }

  async getAll(req, res, next) {
    try {
      const { boardId } = req.params;
      const tasks = await this.taskService.getAll(boardId);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { boardId } = req.params;
      const tasks = await this.taskService.create(boardId, req.body);
      res.status(201).json(tasks);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id, boardId } = req.params;
      const task = await this.taskService.getById(id, boardId);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id, boardId } = req.params;
      const task = await this.taskService.update(id, boardId, req.body);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id, boardId } = req.params;
      await this.taskService.delete(id, boardId);
      res
        .status(200)
        .json({ status: 'success', statusCode: 200, message: 'OK' });
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
