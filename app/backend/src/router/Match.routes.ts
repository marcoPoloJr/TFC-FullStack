import { Router } from 'express';
import MartchController from '../controllers/Match.controllers';
import verifyToken from '../middleware/VerifyToken';
import verifyTeams from '../middleware/VerifyTeams';

const matchRouter = Router();

matchRouter.get('/', MartchController.getAllMatches);
matchRouter.patch('/:id/finish', verifyToken, MartchController.finishMatch);
matchRouter.patch('/:id', verifyToken, MartchController.upDateMatch);
matchRouter.post('/', verifyToken, verifyTeams, MartchController.createMatch);
export default matchRouter;
