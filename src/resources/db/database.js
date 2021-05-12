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

  async getUserById(id) {
    return this._users.find(user => user.id === id);
  }

  async updateUser(user) {
    this._users = this._users.map((elem) => elem.id === user.id ? user : elem)
  }

}
