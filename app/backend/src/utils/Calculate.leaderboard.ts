import { Match, TeamInfo } from '../interfaces';

export default class Calculate {
  public static teamStatus(teamName:string, matches: Match[]):TeamInfo {
    const { victories, draws, losses } = this.calculateMatches(matches);
    const { goalsFavor, goalsOwn, goalsBalance } = this.calculateGoals(matches);
    const totalPoints = this.calculatePoints(victories.length, draws.length);
    const efficiency = this.calculateEfficiency(totalPoints, matches.length);
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

  public static calculatePoints(victories:number, drawns:number) {
    return (victories * 3) + drawns;
  }

  public static calculateMatches(matches:Match[]) {
    const victories = matches.filter((mat) => mat.homeTeamGoals > mat.awayTeamGoals);
    const draws = matches.filter((mat) => mat.homeTeamGoals === mat.awayTeamGoals);
    const losses = matches.filter((mat) => mat.homeTeamGoals < mat.awayTeamGoals);
    return { victories, draws, losses };
  }

  public static calculateGoals(matches:Match[]) {
    const goalsFavor = matches.reduce((acc, mat) => acc + mat.homeTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, mat) => acc + mat.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  public static calculateEfficiency(totalPoints:number, matches:number) {
    return Number(((totalPoints / (matches * 3)) * 100).toFixed(2));
  }
}
