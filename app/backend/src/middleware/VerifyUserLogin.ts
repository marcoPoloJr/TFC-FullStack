import { Request, NextFunction, Response } from 'express';
// import BadRequest from '../utils/BadRequest';
import { compare } from 'bcryptjs';

import UserModel from '../database/models/User.model';

const VerifyUserLogin = async (req:Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body;
  const invalidMessage = 'Invalid email or password';

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const userEmailRegex = regex.test(email);
  const userPassword = password.length > 5;

  if (!userEmailRegex || !userPassword) return res.status(401).json({ message: invalidMessage });

  const userEmail = await UserModel.findOne({ where: { email } });
  if (!userEmail) return res.status(401).json({ message: invalidMessage });

  const validPassword = await compare(password, userEmail.password);
  if (!validPassword) return res.status(401).json({ message: invalidMessage });

  next();
};

export default VerifyUserLogin;
