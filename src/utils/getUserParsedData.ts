import { IncomingMessage } from 'http';
import { UserData } from '../types';

const getBody = (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('error', (err) => reject(err));

    req.on('end', () => resolve(body));
  });
};

const getUserParsedData = async (req: IncomingMessage) => {
  try {
    const userDataBody = await getBody(req);
    const userParsedData = JSON.parse(userDataBody as string) as UserData;
    const userData: UserData = {
      username: userParsedData.username || undefined,
      age: userParsedData.age || undefined,
      hobbies: Array.isArray(userParsedData.hobbies)
        ? userParsedData.hobbies
        : undefined,
    };

    return Object.values(userData).every((prop) => prop !== undefined)
      ? userData
      : undefined;
  } catch {
    return undefined;
  }
};

export { getUserParsedData };
