import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown"
import PropItem from "./PropItem"
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
            }
        }

        fetchData()
    }, []);
    return (
        <div className="flex flex-col py-5 bg-zinc-900 pt-3">
            {/* <PropItem player={test_players[0]} /> */}
            <div className="flex items-end pr-5 py-2 justify-end">
                <Dropdown />
            </div>
            {
                data.map((player) => {

                    // {console.log("TRYING TO SEND THIS OBJECT to PROPITEM")}
                    // {console.log(player)}

                    return <PropItem player={player} />

                    })
                    
            }
        </div>
    )
}