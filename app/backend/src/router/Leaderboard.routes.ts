import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderboardController.getLeaderboard);
leaderboardRouter.get('/away', LeaderboardController.getLeaderboard);

export default leaderboardRouter;
