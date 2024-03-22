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
    console.log(test_players)
    return (
        
        <div className="flex bg-zinc-900 pt-3">
            {/* {console.log(test_players[0])}
            <PropItem player={test_players[0]} />
            
            {
                test_players.map((player) => {
                    <PropItem player={player} />
                    })
            } */}
        </div>
    )
}