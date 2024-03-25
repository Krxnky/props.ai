import Image from "next/image";

export default function PropItem(player){
       
    return (
        <div className="flex flex-row bg-zinc-800 rounded-xl p-5 m-2">
            {/* {console.log("PLAYER OBJECT")}
            {console.log(player.player.id)} */}
            <Image 
                src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.player.id}.png`}
                width={175}
                height={175} 
                className="py-7"    
            />
            <div className="flex flex-col pl-10">
                <p className="text-xl">
                    {player.player.name}
                </p>
                <p className="text-left text-sm font-thin">
                    {player.player.id}
                </p>
            </div>
        </div>
        // <div className="flex flex-row bg-0f0f12 rounded-lg p-4 m-2">
        //     <Image src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.player.id}.png`} alt={player.player.name} width={50} height={50} className="flex-grow" />
        //     <p className="text-white text-lg font-bold flex-grow">{player.player.name}</p>
        //     <p className="text-gray-300 flex-grow">Player ID: {player.player.id}</p>
        // </div>
    )
}