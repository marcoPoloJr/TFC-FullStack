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
}
