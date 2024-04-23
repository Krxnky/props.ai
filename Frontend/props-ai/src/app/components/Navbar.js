import Image from "next/image";
import Dropdown from "./Dropdown";
import {Roboto } from "@next/font"
import { Inconsolata } from "next/font/google";
export default function Navbar() {
    const roboto = Inconsolata({
        subsets: ['latin'],
        weight: ['200','300','400']
    })
    return (
        <div className='flex min-w-screen bg-zinc-800 drop-shadow-xl justify-around'>
            
            <Image src={"/props_ai_temp_logo.png"} width={50} height={50}>

            </Image>
        </div>
    )
}