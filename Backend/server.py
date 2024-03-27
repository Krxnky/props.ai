import time
from datetime import date
from flask import Flask, request
from nba_api.stats.endpoints import playergamelog, ScoreboardV2, CommonTeamRoster
from nba_api.stats.static.teams import find_team_name_by_id

app = Flask(__name__)

@app.route("/get-players")
# TODO: REPLACE WITH ACTUAL ACTIVE PLAYERS AND THEIR PROP LINES 
def get_players():
    players = []
    scoreboard = ScoreboardV2(game_date=request.args.get('date') or date.today())
    data = scoreboard.get_normalized_dict()

    for game in data["GameHeader"]:
        homeRoster = CommonTeamRoster(team_id=game["HOME_TEAM_ID"]).get_normalized_dict()
        awayRoster = CommonTeamRoster(team_id=game["VISITOR_TEAM_ID"]).get_normalized_dict()

        def format_player(player):
            return {
                'player_id': player['PLAYER_ID'],
                'name': player['PLAYER'],
                'team_id': player['TeamID'],
                'team_name': find_team_name_by_id(player['TeamID'])["full_name"],
                'position': player['POSITION'],
                'number': player['NUM'],
                'game': {
                    'date': game['GAME_DATE_EST'],
                    'arena': game['ARENA_NAME'],
                    'home': {
                        'team_id': game['HOME_TEAM_ID'],
                        'team_name': find_team_name_by_id(game["HOME_TEAM_ID"])["full_name"]
                    },
                    'visitor': {
                        'team_id': game['VISITOR_TEAM_ID'],
                        'team_name': find_team_name_by_id(game["VISITOR_TEAM_ID"])["full_name"]
                    }
                }
            }

        for h,a in zip(homeRoster["CommonTeamRoster"], awayRoster["CommonTeamRoster"]):
            players.append(format_player(h))
            players.append(format_player(a))

    return players

@app.route('/get-props')
def get_props():
    return ''