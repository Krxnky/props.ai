import time
import json
from datetime import date
from flask import Flask, request
from nba_api.stats.endpoints import playergamelog, ScoreboardV2, CommonTeamRoster
from nba_api.stats.static.teams import find_team_name_by_id
from model import PropsModelV1
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

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

def statType(stat):
        # find the stat retrieved
            if stat == "Pts+Rebs+Asts":
                return "pra"
            elif stat == "Pts+Asts":
                return "pa"
            elif stat == "Pts+Rebs":
                return "pr"
            elif stat == "Rebs+Asts":
                return "ra"
            elif stat == "3-PT Made":
                return "threes"
            elif stat == "Blocked Shots":
                return "blocks"
            else:
                return stat

@app.route('/props')
def get_props():
    # TODO: FETCH PROPS FROM BETTING PLATFORM
    # DEFAULT = PRIZEPICKS
    platform = request.args.get('platform').lower() or 'prizepicks'
    if platform == 'prizepicks':
        with open('./data/prizepicks_predicted_props.json') as file:
            props_json = json.load(file)
            if props_json['date'] == str(date.today()):
                return props_json['props']
            else:
                with open('./data/projections.json', 'r') as file:
                    json_data = json.load(file)
                    seive = {"points", "rebounds", "assists", "threes", "blocks", "steals", "pra", "pr", "pa", "ra"}
                    player_names = {elem["id"]: elem["attributes"]["name"]
                                    for elem in json_data["included"]
                                    if elem["type"] == "new_player"}
                    player_projections = []
                    for projection in json_data["data"]:
                        print(projection)
                        if projection["type"] == "projection":
                            player_id = projection["relationships"]["new_player"]["data"]["id"]
                            player_name = player_names.get(player_id, "Unknown Player")
                            projection_id = projection['id']

                            flash_sale = projection["attributes"].get("flash_sale_line_score")
                            line_score = projection["attributes"]["line_score"]
                            player_team = projection["attributes"]["description"]
                            stat_type = statType(projection["attributes"]["stat_type"]).lower()
                            start_time = projection["attributes"]["start_time"]

                            if stat_type in seive and projection["attributes"].get("adjusted_odds") is not True:
                                player_projections.append({
                                    'projection_id': projection_id,
                                    'player_name': player_name,
                                    'player_team' : player_team,
                                    'stat_type': stat_type,
                                    'line_score': line_score,
                                    'start_time': start_time
                                })

                            if stat_type in seive and flash_sale is not None:
                                player_projections.append({
                                    'projection_id': projection_id,
                                    'player_name': player_name,
                                    'stat_type': stat_type,
                                    'line_score': flash_sale,
                                    'start_time': start_time
                                })
                    
                    data = []
                    supported_stats = ['points', 'assists', 'rebounds']
                    for idx, player in enumerate(player_projections):

                        if(player['stat_type'] in supported_stats):
                            print(f"PREDICTING {player['player_name']} AT {player['line_score']} {player['stat_type']} ({idx}/{len(player_projections)})")
                            try:
                                model = PropsModelV1(player['player_name'], player['stat_type'], player['line_score'])
                                prediction = model.predict()
                                player.update(prediction)
                                print(player)
                                data.append(player)
                                time.sleep(.5)
                            except:
                                print(f"ERROR OCCURED WHILE PREDICTING {player['player_name']} AT {player['line_score']} {player['stat_type']}")
                    
                    with open('./data/prizepicks_predicted_props.json', 'w') as out:
                        out.write(json.dumps({'props': data, 'date': str(date.today())}))

                    return data
    elif platform == 'draftkings':
        return ''