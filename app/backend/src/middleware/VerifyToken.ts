import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/Auth';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const verify = validateToken(token);

  if (verify.message) {
    return res.status(401).json({ message: verify.message });
  }

  next();
};

export default verifyToken;
