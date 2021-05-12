import { Router } from 'express';
import { TaskService } from './task.service.js';

export class TaskController {
  constructor() {
    this.taskService = new TaskService();
    this.router = Router({ mergeParams: true });
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.routes();
  }

  async getAll(req, res, next) {
    try {
      const { id } = req.params;
      const tasks = await this.taskService.getAll(id);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { id } = req.params;
      const tasks = await this.taskService.create(id, req.body);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  routes() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.create);
  }
}
