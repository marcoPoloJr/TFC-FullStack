import { Router } from 'express';
import VerifyUserLogin from '../middleware/VerifyUserLogin';
import VerifyToken from '../middleware/VerifyToken';
import UserController from '../controllers/User.controllers';
// import ErrorHandler from '../middleware/ErrorHandler';

const userRouter = Router();

userRouter.post('/', VerifyUserLogin, UserController.login);
userRouter.get('/role', VerifyToken, UserController.getByRole);

export default userRouter;
