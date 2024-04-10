from selenium import webdriver
from selenium.webdriver import FirefoxOptions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import json, requests

class PrizePicks():
    def __init__(self):
        self.url = 'view-source:https://api.prizepicks.com/projections?league_id=7'
        self.options = FirefoxOptions()
        self.options.add_argument('--headless')
        self.driver = webdriver.Firefox(options=self.options)
    def fetchProps(self):
        self.driver.get(self.url)
        data = self.driver.find_element(By.TAG_NAME, 'pre').text
        json_data = json.loads(data)
        seive = {"points", "rebounds", "assists", "threes", "blocks", "steals", "pra", "pr", "pa", "ra"}
        player_names = {elem["id"]: elem["attributes"]["name"]
                        for elem in json_data["included"]
                        if elem["type"] == "new_player"}
        player_projections = []
        for projection in json_data["data"]:
            if projection["type"] == "projection":
                player_id = projection["relationships"]["new_player"]["data"]["id"]
                player_name = player_names.get(player_id, "Unknown Player")
                projection_id = projection['id']

                flash_sale = projection["attributes"].get("flash_sale_line_score")
                line_score = projection["attributes"]["line_score"]
                player_team = projection["attributes"]["description"]
                stat_type = self.statType(projection["attributes"]["stat_type"]).lower()
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
                        'player_team' : player_team,
                        'stat_type': stat_type,
                        'line_score': flash_sale,
                        'start_time': start_time
                    })
        return player_projections
    def statType(self, stat):
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
