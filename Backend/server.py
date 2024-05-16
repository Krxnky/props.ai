import time
import json
import pandas
from datetime import date
from flask import Flask, request
from nba_api.stats.endpoints import PlayerGameLog, ScoreboardV2, CommonTeamRoster
from nba_api.stats.static.teams import find_team_name_by_id
from model import PropsModelV1
from flask_cors import CORS
from platforms.prizepicks import PrizePicks

app = Flask(__name__)
CORS(app)

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



@app.route('/props')
def get_props():
    platform = request.args.get('platform') or 'prizepicks'
    if platform == 'prizepicks':
        print(platform)
        with open('./data/prizepicks_predicted_props.json') as file:
            props_json = json.load(file)
            if props_json['date'] == str(date.today()):
                return props_json['props']
            else:
                prize_picks = PrizePicks()
                player_projections = prize_picks.fetchProps(read_from_file=True)
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
                        except Exception as e:
                            print(e)
                            print(f"ERROR OCCURED WHILE PREDICTING {player['player_name']} AT {player['line_score']} {player['stat_type']}")
                
                with open('./data/prizepicks_predicted_props.json', 'w') as out:
                    out.write(json.dumps({'props': data, 'date': str(date.today())}))

                return data
    elif platform == 'draftkings':
        return ''

@app.route('/last10')
def get_last_ten():
    def convert_date_format(date_str):
        try:
            date_obj = pandas.to_datetime(date_str, format='%b %d, %Y')
            return date_obj.strftime('%m-%d-%Y')
        except ValueError:
            return None

    player_id = request.args.get('player_id')
    stat_type = request.args.get('stat_type')
    PlayoffGameLog = PlayerGameLog(player_id=player_id, season="2023-24", season_type_all_star="Playoffs").get_data_frames()[0]
    PlayoffGameLog["SEASON_TYPE"] = "Playoffs"

    if(len(PlayoffGameLog) >= 10):
        PlayoffGameLog = PlayoffGameLog[0:10]
        
    RegularSeasonGameLog = PlayerGameLog(player_id=player_id).get_data_frames()[0][0:(10 - len(PlayoffGameLog))] if len(PlayoffGameLog) < 10 else None
    df = None
    if(RegularSeasonGameLog is not None):
        RegularSeasonGameLog["SEASON_TYPE"] = "Regular Season"
        print(10 - len(PlayoffGameLog))
        df = pandas.concat([PlayoffGameLog[[stat_type, "MATCHUP", "GAME_DATE", "SEASON_TYPE"]], RegularSeasonGameLog[[stat_type, "MATCHUP", "GAME_DATE", "SEASON_TYPE"]]])
    else:
        df = PlayoffGameLog[[stat_type, "MATCHUP", "GAME_DATE", "SEASON_TYPE"]]
    returnable = []

    df = df.sort_values(by="GAME_DATE", ascending=False)

    for index, row in df.iterrows():
        returnable.append({
            "isHome": "false" if "@" in row.iloc[1] else "true",
            "stat_score": row.iloc[0],
            "vs": row.iloc[1].split(' ')[2],
            "date": convert_date_format(row.iloc[2]),
            "season_type": row.iloc[3]
        })
    return returnable
    
    # stat_type = "PTS"
    # pgl = PlayerGameLog(player_id=203999, season="2023-24", season_type_all_star="Playoffs").get_data_frames()[0][0:10]
    # df = pgl[[stat_type, "MATCHUP", "GAME_DATE"]]
    # returnable = []
    # for index, row in df.iterrows():
    #     returnable.append({
    #         "isHome": "false" if "@" in row.iloc[1] else "true",
    #         "stat_score": row.iloc[0],
    #         "vs": row.iloc[1].split(' ')[2],
    #         "date": row.iloc[2]    
    #     })
    # return returnable