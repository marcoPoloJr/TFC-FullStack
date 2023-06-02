import { Match, TeamInfo } from '../interfaces';

export default class Calculate {
  public static teamStatusHome(teamName:string, matches: Match[]):TeamInfo {
    const { victories, draws, losses } = this.calculateMatchesHome(matches);
    const { goalsFavor, goalsOwn, goalsBalance } = this.calculateGoalsHome(matches);
    const totalPoints = this.calculatePointsHome(victories.length, draws.length);
    const efficiency = this.calculateEfficiencyHome(totalPoints, matches.length);
    return {
      name: teamName,
      totalPoints,
      totalGames: matches.length,
      totalVictories: victories.length,
      totalDraws: draws.length,
      totalLosses: losses.length,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  }

  public static calculatePointsHome(victories:number, drawns:number) {
    return (victories * 3) + drawns;
  }

  public static calculateMatchesHome(matches:Match[]) {
    const victories = matches.filter((mat) => mat.homeTeamGoals > mat.awayTeamGoals);
    const draws = matches.filter((mat) => mat.homeTeamGoals === mat.awayTeamGoals);
    const losses = matches.filter((mat) => mat.homeTeamGoals < mat.awayTeamGoals);
    return { victories, draws, losses };
  }

  public static calculateGoalsHome(matches:Match[]) {
    const goalsFavor = matches.reduce((acc, mat) => acc + mat.homeTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, mat) => acc + mat.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  public static calculateEfficiencyHome(totalPoints:number, matches:number) {
    return Number(((totalPoints / (matches * 3)) * 100).toFixed(2));
  }

  public static teamStatusAway(teamName:string, matches: Match[]):TeamInfo {
    const { victories, draws, losses } = this.calculateMatchesAway(matches);
    const { goalsFavor, goalsOwn, goalsBalance } = this.calculateGoalsAway(matches);
    const totalPoints = this.calculatePointsAway(victories.length, draws.length);
    const efficiency = this.calculateEfficiencyAway(totalPoints, matches.length);
    return {
      name: teamName,
      totalPoints,
      totalGames: matches.length,
      totalVictories: victories.length,
      totalDraws: draws.length,
      totalLosses: losses.length,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  }

  public static calculatePointsAway(victories:number, drawns:number) {
    return (victories * 3) + drawns;
  }

  public static calculateMatchesAway(matches:Match[]) {
    const victories = matches.filter((mat) => mat.awayTeamGoals > mat.homeTeamGoals);
    const draws = matches.filter((mat) => mat.awayTeamGoals === mat.homeTeamGoals);
    const losses = matches.filter((mat) => mat.awayTeamGoals < mat.homeTeamGoals);
    return { victories, draws, losses };
  }

  public static calculateGoalsAway(matches:Match[]) {
    const goalsFavor = matches.reduce((acc, mat) => acc + mat.awayTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, mat) => acc + mat.homeTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  public static calculateEfficiencyAway(totalPoints:number, matches:number) {
    return Number(((totalPoints / (matches * 3)) * 100).toFixed(2));
  }
}
