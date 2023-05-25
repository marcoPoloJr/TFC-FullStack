import { Router } from 'express';
import MartchController from '../controllers/Match.controllers';
// import verifyToken from '../middleware/VerifyToken';

const matchRouter = Router();

matchRouter.get('/', MartchController.getAllMatches);

export default matchRouter;
