import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown"
import PropItem from "./PropItem"
import { Provider } from "react-redux";
import { store } from "@/store/store";
import PropInfoModal from "../components/PropInfoModal";

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/props?platform=prizepicks')
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const jsonData = await response.json()
                setData(jsonData)
                console.log(jsonData)
            } catch (error) {
                console.error('Error fetching data:', error)
                // term(props)
                setData([
                    {
                      "projection_id": "2218712",
                      "player_name": "Miles Bridges",
                      "player_team": "POR",
                      "stat_type": "points",
                      "line_score": 23.5,
                      "start_time": "2024-04-03T19:10:00-04:00",
                      "player_id": 1628970,
                      "accuracy": 0.8518518518518519,
                      "precision": 0.8571428571428571,
                      "recall": 0.6666666666666666,
                      "f1": 0.75,
                      "prediction": "UNDER",
                      "lastTen": [
                        {
                            "isHome": true,
                            "stat_score": 20,
                            "vs": "POR"
                        },
                        {
                            "isHome": false,
                            "stat_score": 30,
                            "vs": "POR"
                        },
                        {
                            "isHome": true,
                            "stat_score": 15,
                            "vs": "POR"
                        },
                        {
                            "isHome": false,
                            "stat_score": 22,
                            "vs": "POR"
                        },
                        {
                            "isHome": true,
                            "stat_score": 24,
                            "vs": "POR"
                        },
                        {
                            "isHome": true,
                            "stat_score": 30,
                            "vs": "POR"
                        },
                        {
                            "isHome": true,
                            "stat_score": 23,
                            "vs": "POR"
                        },
                        {
                            "isHome": false,
                            "stat_score": 9,
                            "vs": "POR"
                        },
                        {
                            "isHome": true,
                            "stat_score": 25,
                            "vs": "POR"
                        },
                        {
                            "isHome": false,
                            "stat_score": 10,
                            "vs": "POR"
                        }
                    ]
                    },
                // {
                //   "projection_id": "2218713",
                //   "player_name": "Deandre Ayton",
                //   "player_team": "CHA",
                //   "stat_type": "points",
                //   "line_score": 22.5,
                //   "start_time": "2024-04-03T19:10:00-04:00",
                //   "player_id": 1629028,
                //   "accuracy": 0.9166666666666666,
                //   "precision": 0.6923076923076923,
                //   "recall": 1,
                //   "f1": 0.8181818181818182,
                //   "prediction": "OVER"
                // },
                ])
                
            }
        }

        fetchData()
    }, []);
    return (
        <>
            <PropInfoModal />
            <div className="flex flex-col py-5 bg-zinc-900 pt-3 ">
                {/* <PropItem player={test_players[0]} /> */}
                <div className="flex items-end pr-5 py-2 justify-end">
                    <Dropdown/>
                </div>
                <div 
                // className="max-md:grid max-md:grid-cols-2 md:flex-col max-md:justify-items-center"
                className="grid max-md:grid-cols-2 md:grid-cols-5 max-md:justify-items-center"
                >

                    {
                        data.map((player) => {

                            // {console.log("TRYING TO SEND THIS OBJECT to PROPITEM")}
                            // {console.log(player)}

                            return <PropItem player={player} />

                            })
                            
                    }
                </div>
            </div>
        </>
    )
}