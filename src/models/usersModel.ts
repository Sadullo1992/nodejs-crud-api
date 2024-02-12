import { User } from '../types';

class Users {
  private _users: User[];
  constructor() {
    this._users = [
      {
        id: '1',
        username: 'Sadullo',
        age: 25,
        hobbies: ['football', 'programming'],
      },
    ];
  }

  getAllUsers(): User[] {
    return this._users;
  }
}

export { Users };
