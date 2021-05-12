export class Database {
  constructor() {
    this._users = [];
  }

  async getUsers() {
    return this._users;
  }

  async addUser(user) {
    await this._users.push(user);
    return user;
  }

}
