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

player_name = "Anthony Davis"
player_id = players.find_players_by_full_name(player_name)[0]["id"]
point_threshold = 24.5

game_log = PlayerGameLog(player_id=player_id, season="2023-24").get_data_frames()[0]
game_log2 = PlayerGameLog(player_id=player_id, season="2022-23").get_data_frames()[0]
column = game_log[['Game_ID', 'GAME_DATE', 'MATCHUP', 'PTS', 'AST', 'STL', 'REB', 'TOV','FGA','FGM', 'FG3M', 'FG3A', 'BLK','FTA','FTM','PLUS_MINUS']]
column2 = game_log[['Game_ID', 'GAME_DATE', 'MATCHUP', 'PTS', 'AST', 'STL', 'REB', 'TOV','FGA','FGM', 'FG3M', 'FG3A', 'BLK','FTA','FTM','PLUS_MINUS']]
frames = [pd.DataFrame(column), pd.DataFrame(column2)]
df = pd.concat(frames)

df['PTS+REB+AST'] = df['PTS'] + df['REB'] + df['AST']
df['PTS+AST'] = df['PTS'] + df['AST']
df['REB+AST'] = df['REB'] + df['AST']
df['PTS+REB'] = df['PTS'] + df['REB']
df['BLKS+STLS'] = df['BLK'] + df['STL']

df['HOME'] = df['MATCHUP'].apply(lambda x: 1 if 'vs. ' in x else 0)
df['OPPONENT'] = df['MATCHUP'].apply(lambda x: x.split()[-1])

features = ['HOME', 'AST', 'STL', 'REB', 'TOV', 'FG3M', 'FG3A', 'BLK', 'FGA', 'FGM', 'FTA', 'FTM', 'PLUS_MINUS']
target = 'PTS'

endpoint = "https://sportsbook.draftkings.com//sites/US-SB/api/v5/eventgroups/42648/categories/1215/subcategories/12488?format=json"

x = df[features]
y = df[target]

y = y.apply(lambda x: 1 if x > point_threshold else 0)

scaler = StandardScaler()
x_scaled = scaler.fit_transform(x);

x_train, x_test, y_train, y_test = train_test_split(x_scaled, y, test_size=0.4, random_state=42)

logisitc_regression_model = LogisticRegression(max_iter=1000)
logisitc_regression_model.fit(x_train, y_train)

predictions = logisitc_regression_model.predict(x_test)

accuracy = accuracy_score(y_test, predictions)
precision = precision_score(y_test, predictions)
recall = recall_score(y_test, predictions)
f1 = f1_score(y_test, predictions)

print(f'Logistic Regression - Accuracy: {accuracy}, Precision: {precision}, Recall: {recall}, F1-score: {f1}\n')

conf_matrix = confusion_matrix(y_test, predictions)
sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicted')
plt.ylabel('True')
plt.title(f'Confusion Matrix - Jimmy Butler Simulated with {point_threshold} points')
plt.show()

if predictions[0] == 1:
    print(f"\nThe model predicts that {player_name} will score over {point_threshold} points in today's game.")
else:
    print(f"\nThe model predicts that {player_name} will score under {point_threshold} points in today's game.")
