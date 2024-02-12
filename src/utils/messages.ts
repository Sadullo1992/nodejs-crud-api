import { ServerResponse } from 'http';
import { User } from '../types';

const sendMessage200 = (res: ServerResponse, data: User[] | User) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};
const sendMessage201 = (res: ServerResponse, data: User) => {
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};
const sendMessage204 = (res: ServerResponse) => {
  res.writeHead(204, { 'Content-Type': 'application/json' });
  res.end();
};
const sendMessage = (res: ServerResponse, code: number, message: string) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message,
    }),
  );
};
const sendMessage500 = (res: ServerResponse) => {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: 'Sorry, Something goes wrong, from the server!',
    }),
  );
};

export {
  sendMessage200,
  sendMessage,
  sendMessage500,
  sendMessage201,
  sendMessage204,
};
