import time
import json
from datetime import date
from flask import Flask, request
from nba_api.stats.endpoints import playergamelog, ScoreboardV2, CommonTeamRoster
from nba_api.stats.static.teams import find_team_name_by_id
from model import PropsModelV1

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
    # TODO: FETCH PROPS FROM PRIZEPICKS
    with open('./projections.json', 'r') as file:
        json_data = json.load(file)
        seive = {"points", "rebounds", "assists", "threes", "blocks", "steals", "pra", "pr", "pa", "ra"}
        player_names = {elem["id"]: elem["attributes"]["name"]
                        for elem in json_data["included"]
                        if elem["type"] == "new_player"}
        player_projections = []
        for projection in json_data["data"]:
            if projection["type"] == "projection":
                player_id = projection["relationships"]["new_player"]["data"]["id"]
                player_name = player_names.get(player_id, "Unknown Player")

                flash_sale = projection["attributes"].get("flash_sale_line_score")
                line_score = projection["attributes"]["line_score"]
                stat_type = projection["attributes"]["stat_type"]
                start_time = projection["attributes"]["start_time"]

                if stat_type == "Pts+Rebs+Asts":
                    stat_type = "pra"
                if stat_type == "Pts+Asts":
                    stat_type = "pa"
                if stat_type == "Pts+Rebs":
                    stat_type = "pr"
                if stat_type == "Rebs+Asts":
                    stat_type = "ra"
                if stat_type == "3-PT Made":
                    stat_type = "threes"
                if stat_type == "Blocked Shots":
                    stat_type = "blocks"

                if stat_type in seive:
                    player_projections.append({
                        'player_name': player_name,
                        'player_id': player_id,
                        'stat_type': stat_type,
                        'line_score': line_score,
                        'start_time': start_time
                    })
        data = []
        for player in player_projections:
            model = PropsModelV1(player['player_name'], player['stat_type'], player['line_score'])
            prediction = model.get_prediction()
            data.append(player.update(prediction))
                

        return data