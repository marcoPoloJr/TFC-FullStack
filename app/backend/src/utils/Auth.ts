import { sign, verify, decode, JwtPayload, SignOptions } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'secret' as string;
const jwtConfig: SignOptions = {
  expiresIn: '100d',
  algorithm: 'HS256',
};

interface IToken {
  email: string,
  message?: string,
}

export const generateToken = (email:string | undefined) => {
  const token = sign(
    { data: { email } },
    secretKey,
    jwtConfig,
  );

  return token;
};

const validateToken = (token:string):IToken => {
  try {
    const isValid = verify(token, secretKey);
    return isValid as IToken;
  } catch (err) {
    return { message: 'Token must be a valid token', email: 'a' };
  }
};
const decodeToken = (token: string) => {
  const result = decode(token) as JwtPayload;
  console.log('AUTH', result);

  const { email } = result.data;

  return email;
};
//   const decodeToken = (token:string):IToken => {
//   const decode = verify(token, secretKey);
//   console.log('AUTH_DECODE', decode);

//   return decode as IToken;
// }

export {
  // generateToken,
  validateToken,
  decodeToken,
};
