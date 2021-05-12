export class Database {
  constructor() {
    this._users = [];
  }

  async getUsers() {
    return this._users;
  }

}
