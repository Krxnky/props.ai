import Dropdown from "../components/Dropdown"
import PropItem from "./PropItem"
export default function Dashboard() {
    const test_players = [
        {
            name: "Nikola Jokic",
            id: "203999",
        },
        {
            name: "Lebron James",
            id: "2544",
        }
    ]
    // console.log(test_players)
    return (
        
        <div className="flex flex-col py-5 bg-zinc-900 pt-3">
            {/* <PropItem player={test_players[0]} /> */}
            <div className="flex items-end pr-5 py-2 justify-end">
                <Dropdown />
            </div>
            {
                test_players.map((player) => {

                    // {console.log("TRYING TO SEND THIS OBJECT to PROPITEM")}
                    // {console.log(player)}

                    return <PropItem player={player} />

                    })
                    
            }
        </div>
    )
}