import { createServer, IncomingMessage, ServerResponse } from 'http';
import 'dotenv';
import 'cross-env';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './controller/usersController';
import { sendMessage, sendMessage500 } from './utils/messages';
import { MSG_API_ROUTE_404 } from './constants';

const PORT = process.env.PORT || 4000;

const serverListener = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(res);
    } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'GET') {
      getUser(req, res);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
      updateUser(req, res);
    } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
      deleteUser(req, res);
    } else sendMessage(res, 404, MSG_API_ROUTE_404);
  } catch {
    sendMessage500(res);
  }
};

const startServer = () => {
  const server = createServer(serverListener);

  server.listen(PORT, () => console.log(`Server is running port: ${PORT}`));

  return server;
};

export default startServer;
