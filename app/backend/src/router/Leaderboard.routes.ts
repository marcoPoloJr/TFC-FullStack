import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderboardController.getHomeLeaderboard);

export default leaderboardRouter;
