import Image from "next/image";
import Dropdown from "./Dropdown";
import { Inconsolata } from "next/font/google";
import Link from "next/link";

const inconsolata = Inconsolata({
    subsets: ['latin'],
    weight: ['300']
})
export default function Navbar() {
    return (
        <div className='flex min-w-screen bg-zinc-800 drop-shadow-xl justify-around text-white text-4xl py-4'>
            <Link href={`/`}>
            
                <h1 className={inconsolata.className}>PROPS.AI</h1>
            </Link>
        </div>
    )
}