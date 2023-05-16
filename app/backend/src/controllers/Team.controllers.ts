import { Request, Response } from 'express';
import TeamService from '../services/Team.services';

export default class TeamController {
  public static async getAll(_req:Request, res: Response) {
    const allTeams = await TeamService.getAll();
    res.status(200).json(allTeams);
  }
}
