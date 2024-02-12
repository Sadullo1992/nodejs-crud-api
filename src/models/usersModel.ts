import { v4 as uuidv4 } from 'uuid';
import { User, UserData } from '../types';

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

  createUser(userData: UserData): User | undefined {
    const user = { id: uuidv4(), ...userData } as User;
    this._users.push(user);
    return this._users.at(-1);
  }
}

export { Users };
