import { NextFunction, Request, Response } from 'express';
import ValidateError from '../utils/ValidateError';
import { validateToken } from '../utils/Auth';

const verifyToken = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new ValidateError('Token not found');
  }

  const verify = validateToken(token);

  if (verify.message) {
    throw new ValidateError(verify.message);
  }

  next();
};

export default verifyToken;
