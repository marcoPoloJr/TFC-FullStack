import { sign, verify } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'secret' as string;

interface IToken {
  id: number,
  message?: string,
}

const generateToken = (email:string | unknown) => {
  const data = {
    email,
  };
  const token = sign(
    data,
    secretKey,
    {
      expiresIn: '100d',
      algorithm: 'HS256',
    },
  );

  return token;
};

const validateToken = (token:string):IToken => {
  try {
    const isValid = verify(token, secretKey);
    return isValid as IToken;
  } catch (err) {
    return { message: 'Token must be a valid token', id: 0 };
  }
};

const decodeToken = (token:string):IToken => {
  const decode = verify(token, secretKey);
  return decode as IToken;
};
export {
  generateToken,
  validateToken,
  decodeToken,
};
