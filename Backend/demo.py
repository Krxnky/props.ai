from datetime import date
import json
from nba_api.stats.endpoints import playergamelog, ScoreboardV2, CommonTeamRoster
from nba_api.stats.static.players import get_active_players
from nba_api.stats.static.teams import get_teams, find_team_name_by_id

def get_tonights_players():
    players = []
    scoreboard = ScoreboardV2(game_date=date.today())
    data = scoreboard.get_normalized_dict()

    for game in data["GameHeader"]:
        # print(find_team_name_by_id(game["HOME_TEAM_ID"])["full_name"] + " : " + find_team_name_by_id(game["VISITOR_TEAM_ID"])["full_name"])
        homeRoster = CommonTeamRoster(team_id=game["HOME_TEAM_ID"]).get_normalized_dict()
        for player in homeRoster["CommonTeamRoster"]:
            players.append(player)

        awayRoster = CommonTeamRoster(team_id=game["VISITOR_TEAM_ID"]).get_normalized_dict()
        for player in awayRoster["CommonTeamRoster"]:
            players.append(player)

    return players
