import { Router } from 'express';
import VerifyUserLogin from '../middleware/VerifyUserLogin';
import UserController from '../controllers/User.controllers';

const userRouter = Router();

userRouter.post('/', VerifyUserLogin, UserController.login);

export default userRouter;
