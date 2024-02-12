import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { MSG_GET_USER_400, MSG_GET_USER_404, MSG_POST_USER_400 } from '../constants';
import { Users } from '../models/usersModel';
import { User } from '../types';
import { getUserParsedData } from '../utils/getUserParsedData';
import { sendMessage200, sendMessage, sendMessage201 } from '../utils/messages';

const users = new Users();

const getUsers = (res: ServerResponse) => {
  const allUsers = users.getAllUsers();
  sendMessage200(res, allUsers);
};

const getUser = (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[3] ?? '';
  const isValidId = uuidValidateV4(id);
  if (isValidId) {
    const user = users.findUser(id);
    if (!user) sendMessage(res, 404, MSG_GET_USER_404);
    else sendMessage200(res, user);
  } else sendMessage(res, 400, MSG_GET_USER_400);
};

const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  const userData = await getUserParsedData(req) as Omit<User, 'id'>;
  const newUser = users.createUser(userData);
  if (!userData || !newUser) sendMessage(res, 400, MSG_POST_USER_400);
  else sendMessage201(res, newUser);
};

function uuidValidateV4(uuid: string) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

export { getUsers, getUser, createUser };
