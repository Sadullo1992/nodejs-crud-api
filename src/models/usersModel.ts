import { User } from '../types';

class Users {
  private _users: User[];
  constructor() {
    this._users = [];
  }

  getAllUsers(): User[] {
    return this._users;
  }

  findUser(id: string): User | undefined {
    const user = this._users.find((item) => item.id === id);
    return user;
  }
}

export { Users };
