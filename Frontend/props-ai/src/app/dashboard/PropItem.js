import Image from "next/image";

export default function PropItem(player){
       
    return (
        <div className="flex-1 flex-row bg-zinc-800 rounded-xl p-5 m-2">
            {/* {console.log("PLAYER OBJECT")}
            {console.log(player.player.id)} */}
            <Image 
                src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.player.id}.png`}
                width={150}
                height={150} 
                className="py-9"    
            />
        </div>
    )
}