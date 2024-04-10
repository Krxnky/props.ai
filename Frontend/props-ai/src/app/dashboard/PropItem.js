import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import "./Bobbing-Arrow.css"
export default function PropItem(player){
    const [propColor, setPropColor] = useState("");
    const dispatch = useDispatch()
    useEffect(() => {
        setPropColor(player.player.prediction == "UNDER" ? "red" : "green")
    }, [])   
    return (
        <>
            <Button
                className="flex flex-col items-center bg-zinc-800 rounded-xl p-5 m-2 max-w-72"
                onClick={() => {
                    dispatch({type: 'activePlayer/changeActivePlayer', payload: player.player})
                    dispatch({type: 'propItemModal/changePropItemModal', payload: true})
                    }}>
               <div className="flex flex-col items-center">
                <Image 
                        src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.player.player_id}.png`}
                        width={175}
                        height={175} 
                        className="py-7"    
                    />
                <div className="flex flex-col items-center">
                    <p className="text-3xl text-white text-center font-light" key={0}>
                        {player.player.player_name}
                    </p>
                    <p className="text-sm text-white text-center font-light" key={1}>
                        {player.player.player_team}
                    </p>
                    <div className="flex flex-row">
                        <Image src={`/${propColor == "red" ? "UNDER" : "OVER"}.svg`} 
                            width={25}
                            height={25}
                            className={`${propColor == "red" ? "animate-bounce" : "rotate-180 animate-bounce-reverse"} pt-1`} 
                        />
                        <p className={`text-3xl text-${propColor}-400 font-bold pl-1`} key={2}>
                                {`${player.player.line_score}`}
                        </p>
                    </div>
                    <p className="text-sm text-white text-center font-bold" key={1}>
                        {player.player.stat_type}
                    </p>
                </div>
                </div> 
            </Button>
            {/* <Button
                className="hidden md:flex w-full bg-zinc-800 rounded-xl p-5 m-2" 
                onClick={() => {
                    dispatch({type: 'activePlayer/changeActivePlayer', payload: player.player})
                    dispatch({type: 'propItemModal/changePropItemModal', payload: true})
                    }}>
                
                <div className="flex flex-row">
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
                        <p className="text-left text-sm text-white font-light" key={1}>
                            {player.player.player_team}
                        </p>
                        
                        
                    </div>
                    <div className="flex-1">

                    </div>
                    <div className={`min-w-36 rounded-xl bg-${propColor}-500 absolute right-10 min-h-44`}>
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
            </Button> */}
        </>
        // <div className="flex flex-row bg-0f0f12 rounded-lg p-4 m-2">
        //     <Image src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.player.id}.png`} alt={player.player.name} width={50} height={50} className="flex-grow" />
        //     <p className="text-white text-lg font-bold flex-grow">{player.player.name}</p>
        //     <p className="text-gray-300 flex-grow">Player ID: {player.player.id}</p>
        // </div>
    )
}