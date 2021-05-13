import { Router } from 'express';
import { UserService } from './user.service.js';
import { User } from './user.model.js';
import { Message } from '../../common/const.js';

export class UserController {
  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }

  getAll = async (req, res) => {
    const users = await this.userService.getAll();
    res.json(users.map(User.toResponse));
  }

  create = async (req, res) => {
    const user = await this.userService.create(req.body);
    res.status(201).json(User.toResponse(user));
  }

  getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await this.userService.getById(id);
      res.status(200).json(User.toResponse(user));
    } catch (err) {
      next(err);
    }
  }

  update = async (req, res, next) => {
    const { id } = req.params;
    const user = req.body;
    try {
      await this.userService.update(id, user);
      res
        .status(200)
        .json({
          status: 'success',
          statusCode: 200,
          message: Message.USER.UPDATED,
        });
    } catch (err) {
      next(err);
    }
  }

  delete = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.userService.deleteUser(id);
      res
        .status(200)
        .json({
          status: 'success',
          statusCode: 200,
          message: Message.USER.DELETED,
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
