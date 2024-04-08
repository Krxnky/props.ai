import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PropItem(player){
    const [propColor, setPropColor] = useState("");
    useEffect(() => {
        setPropColor(player.player.prediction == "UNDER" ? " bg-red-500" : " bg-green-500")
    }, [])   
    return (
        <Link href="?modal=true">
            
            <div className="flex flex-row bg-zinc-800 rounded-xl p-5 m-2">
                {/* {console.log("PLAYER OBJECT")}
                {console.log(player.player.id)} */}
                <Image 
                    src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.player.player_id}.png`}
                    width={175}
                    height={175} 
                    className="py-7"    
                />
                <div className="flex flex-col pl-10 ">
                    <p className="text-3xl text-white font-light" key={0}>
                        {player.player.player_name}
                    </p>
                    <p className="text-left text-sm font-thin" key={1}>
                        {player.player.player_id}
                    </p>
                </div>
                <div className="flex-1">

                </div>
                <div className={"min-w-36 rounded-xl" + propColor}>
                    <div className="flex-col text-center justify-center">
                        <p className="text-white font-bold">
                            {player.player.prediction}
                        </p>   
                        <p className="text-white text-4xl">
                            {player.player.line_score}
                        </p>   
                        <p className="text-white font-bold">
                            {player.player.stat_type}
                        </p>   
                    </div>
                </div>
            </div>
        </Link>
        // <div className="flex flex-row bg-0f0f12 rounded-lg p-4 m-2">
        //     <Image src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.player.id}.png`} alt={player.player.name} width={50} height={50} className="flex-grow" />
        //     <p className="text-white text-lg font-bold flex-grow">{player.player.name}</p>
        //     <p className="text-gray-300 flex-grow">Player ID: {player.player.id}</p>
        // </div>
    )
}