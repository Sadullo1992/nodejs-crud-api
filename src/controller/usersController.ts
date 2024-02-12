import { ServerResponse } from 'http';
import { Users } from '../models/usersModel';

const users = new Users();

const getUsers = (res: ServerResponse) => {
  const allUsers = users.getAllUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(allUsers));
};

export { getUsers };
