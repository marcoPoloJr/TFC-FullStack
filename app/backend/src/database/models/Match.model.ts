import { Model, INTEGER, BOOLEAN } from 'sequelize';
import TeamModel from './Team.model';
import db from '.';

export interface MatchAtributtes {
  id:number,
  homeTeamId:number,
  homeTeamGoals:number,
  awayTeamId:number,
  awayTeamGoals:number,
  inProgress:boolean,
}

class MatchModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId:number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  tableName: 'matches',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default MatchModel;
