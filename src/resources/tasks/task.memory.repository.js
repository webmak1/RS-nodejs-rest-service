import {Repository} from '../../common/repository.js';

export class TaskRepository extends Repository {

  async getAll(boardId) {
    return this.db.getTasks(boardId);
  }

}
