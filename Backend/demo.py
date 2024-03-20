import datetime
from nba_api.stats.endpoints import playergamelog

# Find Jokic's player ID (can be found online or through nba_api's static data endpoints)
player_id = 203999  # Example ID for Nikola Jokic

# Get the most recent season (assuming today's date is within the season)
current_season = datetime.date.today().year - 1  # Adjust for the previous year if needed

# Call the endpoint specifying player ID and season
jokic_gamelog = playergamelog.PlayerGameLog(player_id=player_id, season=current_season)

# Get the data (can be returned as JSON, dictionary, or pandas DataFrame)
gamelog_data = jokic_gamelog.get_data_frames()[0]  # Returns a  pandas DataFrame

print(gamelog_data)