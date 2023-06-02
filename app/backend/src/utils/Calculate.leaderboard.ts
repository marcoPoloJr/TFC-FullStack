import { Match, TeamInfo } from '../interfaces';

export default class Calculate {
  // HOME

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

  // AWAY

  public static teamStatusAway(teamName:string, matches: Match[]) {
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

  // FULL
  public static teamStatusFull(teamName:string, homeMatches:Match[], awayMatches:Match[]) {
    const homeMatch = Calculate.teamStatusHome(teamName, homeMatches);
    const awayMatch = Calculate.teamStatusAway(teamName, awayMatches);
    const { goalsFavor, goalsOwn, goalsBalance } = this.statusGoalsFull(homeMatch, awayMatch);
    const { totalGames, totalPoints } = this.statusTotalFull(homeMatch, awayMatch);
    const efficiency = this.calculateEfficiencyFull(totalPoints, totalGames);
    return { name: teamName,
      totalPoints,
      totalGames,
      totalVictories: homeMatch.totalVictories + awayMatch.totalVictories,
      totalDraws: homeMatch.totalDraws + awayMatch.totalDraws,
      totalLosses: homeMatch.totalLosses + awayMatch.totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  }

  public static calculateEfficiencyFull(totalPoints:number, totalGames:number) {
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  public static statusGoalsFull(homeMatch:TeamInfo, awayMatch:TeamInfo) {
    const goalsFavor = homeMatch.goalsFavor + awayMatch.goalsFavor;
    const goalsOwn = homeMatch.goalsOwn + awayMatch.goalsOwn;
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  public static statusTotalFull(homeMatch:TeamInfo, awayMatch:TeamInfo) {
    const totalGames = homeMatch.totalGames + awayMatch.totalGames;
    const totalPoints = homeMatch.totalPoints + awayMatch.totalPoints;
    return { totalGames, totalPoints };
  }
  // public static calculatePointsFull(victories:number, drawns:number) {
  //   return (victories * 3) + drawns;
  // }

  // public static calculateMatchesFull(homeMatch:Match[], awayMatch:Match[]) {
  //   const victories = homeMatch.totalVictories + awayMatch.totalVictories;
  //   const draws = homeMatch.totalDraws + awayMatch.totalDrawns;
  //   const losses = homeMatch.totalLosses + awayMatch.totalLosses;
  //   return { victories, draws, losses };
  // }

  // public static calculateGoalsFull(homeMatch:Match[], awayMatch:Match[]) {
  //   const goalsFavor = homeMatch.goalsFavor + awayMatch.goalsFavor;
  //   const goalsOwn = homeMatch.goalsOwn + awayMatch.goalsOwn;
  //   const goalsBalance = goalsFavor - goalsOwn;
  //   return { goalsFavor, goalsOwn, goalsBalance };
  // }
}
