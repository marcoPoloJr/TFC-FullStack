import { Request, Response } from 'express';
import TeamService from '../services/Team.services';

export default class TeamController {
  public static async getTeams(_req:Request, res: Response):
  Promise<void> {
    const teams = await TeamService.getTeams();
    res.status(200).json(teams);
  }
}
