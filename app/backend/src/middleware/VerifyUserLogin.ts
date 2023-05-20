import { Request, NextFunction, Response } from 'express';
import BadRequest from '../utils/BadRequest';
import isUserValid from '../utils/IsUserValid';

const VerifyUserLogin = (req:Request, _res:Response, next:NextFunction) => {
  if (!req.body.email || !req.body.password) {
    throw new BadRequest('All fields must be filled');
  }
  isUserValid(req.body);
  next();
};

export default VerifyUserLogin;
