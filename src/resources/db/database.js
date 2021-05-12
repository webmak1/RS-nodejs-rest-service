export class Database {
  constructor() {
    this._users = [];
    this._boards = [];
  }

  // User

  async getUsers() {
    return this._users;
  }

  async addUser(user) {
    await this._users.push(user);
    return user;
  }

  async getUserById(id) {
    return this._users.find((user) => user.id === id);
  }

  async updateUser(user) {
    this._users = this._users.map((elem) =>
      elem.id === user.id ? user : elem
    );
  }

  async deleteUser(id) {
    this._users = this._users.filter((elem) => elem.id !== id);
  }

  // Board

  async getBoards() {
    return this._boards;
  }

  async addBoard(board) {
    await this._boards.push(board);
    return board;
  }

  async getBoardById(id) {
    return this._boards.find((board) => board.id === id);
  }
}
