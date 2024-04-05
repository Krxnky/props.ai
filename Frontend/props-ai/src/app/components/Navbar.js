import Image from "next/image";
import Dropdown from "./Dropdown";

export default function Navbar() {
    return (
        
        <div className='flex min-w-screen bg-zinc-800 drop-shadow-xl justify-around'>
            
            <Image src={"/props_ai_temp_logo.png"} width={50} height={50}>

            </Image>
        </div>
    )
}