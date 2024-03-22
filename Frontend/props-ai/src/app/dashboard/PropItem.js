import Image from "next/image";

export default function PropItem(player){

    return (
        <div className="flex-1">
            {console.log(player)}
            <Image src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/100x100/${player.id}.png`} width={100} height={100} />
        </div>
    )
}