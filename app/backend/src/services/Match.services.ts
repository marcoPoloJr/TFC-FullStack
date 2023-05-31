import TeamModel from '../database/models/Team.model';
import MatchModel, { MatchAtributtes } from '../database/models/Match.model';

export default class MatchService {
  public static async getAllMatch(inProgress:unknown):Promise<MatchAtributtes[]> {
    const allMatches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (inProgress === 'true') {
      const filterAllMatches = allMatches.filter((match) =>
        match.inProgress === true);
      return filterAllMatches;
    }
    if (inProgress === 'false') {
      const filterAllMatches = allMatches.filter((match) =>
        match.inProgress === false);
      return filterAllMatches;
    }
    return allMatches;
  }

  public static async finishMatch(id:number) {
    const mathcId = await MatchModel.findByPk(id);
    console.log('MATCHID', mathcId);

    const matchFinish = await mathcId?.update({ inProgress: false });
    console.log('MATCHFINISH', matchFinish);
    return matchFinish;
  }

  public static async upDateMatch(
    id: number,
    homeTeamGoals:number,
    awayTeamGoals:number,
  ) {
    const matchId = await MatchModel.findByPk(id);
    console.log('matchId', matchId);
    const matchUpDate = await matchId?.update({ homeTeamGoals, awayTeamGoals });
    console.log('matchUpDate', matchUpDate);
    return matchUpDate;
  }

  public static async creatMatch(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  ) {
    const newMatch = await MatchModel.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }
}
