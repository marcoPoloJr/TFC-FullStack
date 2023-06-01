import { Request, Response } from 'express';
import MatchService from '../services/Match.services';

export default class MartchController {
  public static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatches = await MatchService.getAllMatch(inProgress);
    res.status(200).json(allMatches);
  }

  public static async finishMatch(req:Request, res:Response) {
    const { id } = req.params;
    await MatchService.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  public static async upDateMatch(req: Request, res:Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const update = await MatchService.upDateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json(update);
  }

  public static async createMatch(req:Request, res:Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;

    const createMatch = await MatchService.creatMatch(
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    );
    res.status(201).json(createMatch);
  }
}
