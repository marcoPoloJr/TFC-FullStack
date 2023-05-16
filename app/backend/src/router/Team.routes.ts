import { Router } from 'express';
import TeamControllers from '../controllers/Team.controllers';

const router = Router();

const { getTeams } = TeamControllers;

export default router.get('/', getTeams);
