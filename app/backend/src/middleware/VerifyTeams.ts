import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/Team.services';

const verifyTeams = async (req:Request, res: Response, next:NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      {
        message: 'It is not possible to create a match with two equal teams',
      },
    );
  }
  const homeTeam = await TeamService.getById(homeTeamId);
  const awayTeam = await TeamService.getById(awayTeamId);

  if (!homeTeam || !awayTeam) {
    return res.status(404).json(
      {
        message: 'There is no team with such id!',
      },
    );
  }

  next();
};

export default verifyTeams;
