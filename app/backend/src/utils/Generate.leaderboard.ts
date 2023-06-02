import { Match, Team, TeamInfo } from '../interfaces';
import Calculate from './Calculate.leaderboard';

export default class Generate {
  public static generateLeaderboardHome(allMatches:Match[], allTeams:Team[]) {
    const leaderboard = allTeams.map((team) => this.generateRowsHome(allMatches, team));
    return this.sortRows(leaderboard);
  }

  public static generateLeaderboardAway(allMatches:Match[], allTeams:Team[]) {
    const leaderboard = allTeams.map((team) => this.generateRowsAway(allMatches, team));
    return this.sortRows(leaderboard);
  }

  public static generateLeaderboardFull(allMatches:Match[], allTeams:Team[]) {
    const leaderboard = allTeams.map((team) => this.generateRowsFull(allMatches, team));
    return this.sortRows(leaderboard);
  }

  public static generateRowsHome(allMatches:Match[], { id, teamName }:Team) {
    const teamMatchesHome = allMatches.filter((mat) => mat.homeTeamId === id);

    // console.log('GENARATEROWSHOME', teamMatchesHome);

    return Calculate.teamStatusHome(teamName, teamMatchesHome);
  }

  public static generateRowsAway(allMatches:Match[], { id, teamName }:Team) {
    const teamMatchesAway = allMatches.filter((mat) => mat.awayTeamId === id);
    // console.log('GENARATEROWSAWAY', teamMatchesAway);

    return Calculate.teamStatusAway(teamName, teamMatchesAway);
  }

  public static generateRowsFull(allMatches:Match[], { id, teamName }:Team) {
    const teamMatchesHome = allMatches.filter((mat) => mat.homeTeamId === id);
    const teamMatchesAway = allMatches.filter((mat) => mat.awayTeamId === id);
    // console.log('GENARATEROWSFULL', teamMatchesHome);

    return Calculate.teamStatusFull(teamName, teamMatchesHome, teamMatchesAway);
  }

  public static sortRows(leaderboard:TeamInfo[]) {
    return leaderboard.sort((home, away) =>
      away.totalPoints - home.totalPoints
        || away.totalVictories - home.totalVictories
        || away.goalsBalance - home.goalsBalance
        || away.goalsFavor - home.goalsFavor
        || away.goalsOwn - home.goalsOwn);
  }
}
