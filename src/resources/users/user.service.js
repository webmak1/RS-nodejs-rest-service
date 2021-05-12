import { UserRepository } from './user.memory.repository.js';

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll() {
    return this.userRepository.getAll();
  }
}
