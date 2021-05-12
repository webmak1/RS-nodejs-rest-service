import { UserRepository } from './user.memory.repository.js';
import { ErrorHandler } from '../../middlewares/error.js';

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll() {
    return this.userRepository.getAll();
  }

  async create(user) {
    return this.userRepository.create(user);
  }

  async getById(id) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new ErrorHandler(404, `User with id ${id} not found`);
    }
    return user;
  }
}
