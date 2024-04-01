import pandas as pd
from datetime import date
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from nba_api.stats.endpoints import PlayerGameLog, ScoreboardV2, CommonTeamRoster
from nba_api.stats.static import players

class PropsModelV1():
    def __init__(self, player_name, stat_type, line_score):
        self.player_name = player_name
        self.stat_type = stat_type
        self.line_score = line_score

    def get_prediction(self):
        player_id = players.find_players_by_full_name(self.player_name)[0]["id"]
        print(players.find_players_by_full_name(self.player_name)[0])

        game_log = PlayerGameLog(player_id=player_id, season="2023-24").get_data_frames()[0]
        game_log2 = PlayerGameLog(player_id=player_id, season="2022-23").get_data_frames()[0]
        column = game_log[['Game_ID', 'GAME_DATE', 'MATCHUP', 'PTS', 'AST', 'STL', 'REB', 'TOV','FGA','FGM', 'FG3M', 'FG3A', 'BLK','FTA','FTM','PLUS_MINUS']]
        column2 = game_log2[['Game_ID', 'GAME_DATE', 'MATCHUP', 'PTS', 'AST', 'STL', 'REB', 'TOV','FGA','FGM', 'FG3M', 'FG3A', 'BLK','FTA','FTM','PLUS_MINUS']]
        frames = [pd.DataFrame(column), pd.DataFrame(column2)]
        df = pd.concat(frames)

        df['PTS+REB+AST'] = df['PTS'] + df['REB'] + df['AST']
        df['PTS+AST'] = df['PTS'] + df['AST']
        df['REB+AST'] = df['REB'] + df['AST']
        df['PTS+REB'] = df['PTS'] + df['REB']
        df['BLKS+STLS'] = df['BLK'] + df['STL']

        df['HOME'] = df['MATCHUP'].apply(lambda x: 1 if 'vs. ' in x else 0)
        df['OPPONENT'] = df['MATCHUP'].apply(lambda x: x.split()[-1])

        if self.stat_type == 'points':
            features = ['HOME', 'AST', 'STL', 'REB', 'TOV', 'FG3M', 'FG3A', 'BLK', 'FGA', 'FGM', 'FTA', 'FTM', 'PLUS_MINUS']
            target = 'PTS'
        elif self.stat_type == 'rebounds':
            features = ['HOME', 'AST', 'STL', 'PTS', 'TOV', 'FG3M', 'FG3A', 'BLK']
            target = 'REB'
        elif self.stat_type == 'assists':
            features = ['HOME', 'PTS', 'STL', 'REB', 'TOV', 'FG3M', 'FG3A', 'BLK']
            target = 'AST'

        x = df[features]
        y = df[target]

        y = y.apply(lambda x: 1 if x > self.line_score else 0)

        scaler = StandardScaler()
        x_scaled = scaler.fit_transform(x)

        x_train, x_test, y_train, y_test = train_test_split(x_scaled, y, test_size=0.4, random_state=42)

        logisitc_regression_model = LogisticRegression(max_iter=1000)
        logisitc_regression_model.fit(x_train, y_train)

        predictions = logisitc_regression_model.predict(x_test)

        accuracy = accuracy_score(y_test, predictions)
        precision = precision_score(y_test, predictions)
        recall = recall_score(y_test, predictions)
        f1 = f1_score(y_test, predictions)

        return {
            'player_id': player_id,
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1': f1,
            'prediction': 'OVER' if predictions[0] == 1 else 'UNDER'
        }
