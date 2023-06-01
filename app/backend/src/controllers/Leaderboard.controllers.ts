import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.services';

export default class LeaderboardController {
  public static async getLeaderboard(req:Request, res:Response):Promise<Response | void> {
   const type  = req.path;
   console.log('reqTYPE', type);
   
   if(type === '/home'){
     const leaderboard = await LeaderboardService.getHomeLeaderboard();
     res.status(200).json(leaderboard);
   }
   if(type === '/away'){
    const leaderboard = await LeaderboardService.getAwayLeaderboard();
    res.status(200).json(leaderboard);
  }
     
   }
}
