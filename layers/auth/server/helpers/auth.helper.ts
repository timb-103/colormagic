import type { Jwt } from 'jsonwebtoken';

export function parseJwt(token: string): Jwt {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
