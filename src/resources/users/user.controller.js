import { Router } from 'express';
import { UserService } from './user.service.js';
import { User } from './user.model.js';

export class UserController {
  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.routes();
  }

  async getAll(req, res) {
    const users = await this.userService.getAll();
    res.json(users.map(User.toResponse));
  }

  async create(req, res) {
    const user = await this.userService.create(req.body);
    res.status(201).json(User.toResponse(user));
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await this.userService.getById(id);
      res.status(200).json(User.toResponse(user));
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
