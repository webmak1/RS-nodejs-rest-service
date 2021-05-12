export class UserRepository {
  constructor() {
    this.users = [];
  }

  async getAll() {
    return this.users;
  }
}
