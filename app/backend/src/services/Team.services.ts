import NotFoundError from '../utils/NotFoundError';
import TeamModel from '../database/models/Team.model';
import { Team } from '../interfaces';

export default class TeamService {
  public static async getAll(): Promise<Team[]> {
    return TeamModel.findAll();
  }

  public static async getById(id:number): Promise<Team> {
    const getId = await TeamModel.findByPk(id);

    if (!getId) throw new NotFoundError('There is no team with this ID!');
    return getId;
  }
}
