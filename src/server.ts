import { createServer, IncomingMessage, ServerResponse } from 'http';
import { getUsers } from './controller/usersController';

const PORT = process.env.PORT || 4000;
const API_ROOT = '/api/users';

const serverListener = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === API_ROOT && req.method === 'GET') {
    getUsers(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route not found: Please, use the api/users endpoint',
      }),
    );
  }
};

const startServer = () => {
  const server = createServer(serverListener);

  server.listen(PORT, () => console.log(`Server is running port: ${PORT}`));

  return server;
};

export default startServer;
