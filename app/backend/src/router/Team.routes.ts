import { Router } from 'express';
import TeamControllers from '../controllers/Team.controllers';

const teamRouter = Router();

teamRouter.get('/', TeamControllers.getAll);
teamRouter.get('/:id', TeamControllers.getById);

export default teamRouter;
