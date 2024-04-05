"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { store } from "@/store/store"
import { changePlatform } from "@/store/platformSlice"
import Image from "next/image"

export default function Dropdown () {
    const [isActive,setIsActive] = useState(false)
    const platforms = 
    [ {
        platform: "PrizePicks",
        img: "/pp.png",
        id: 0,
    },
    {
        platform: "DraftKings",
        img: "/dk.png",
        id: 1,
    },
    {
        platform: "Sleeper",
        img: "/sleeper.png",
        id: 2,
    }
]
    const activePlatform = useSelector((state) => state.platform.value)
    // const dispatch = useDispatch()
    const dispatch = useDispatch()
    console.log(activePlatform)
    return(
        
        <div className="flex">
            <DropdownMenu>
                <DropdownMenuTrigger 
                className="flex items-center justify-center w-full h-full py-1 pr-7 pl-4 bg-gray-800 rounded-sm mt-1 hover:bg-gray-700 ease-in duration-100">
                         <Image src="/dropdownarrow.svg" width={15} height={15} className="hover:mt-2 ease-out duration-300"></Image>
                         <Image src={activePlatform.img} width={40} height={40} className="mr-2"></Image>
                        <span className="text-white">{activePlatform.platform}</span>
                </DropdownMenuTrigger>
                {/* {console.log("activeapltform: ")}
                {console.log((activePlatform))}
                {console.log(activePlatform.platform == platforms[0].platform)} */}
                <DropdownMenuContent className="bg-gray-800 rounded-md">
                    {platforms.map((platform, index) => (
                        !(activePlatform.platform == platform.platform) ? 
                        <DropdownMenuItem 
                        onClick={() => dispatch({type: 'platform/changePlatform', payload: platform})}
                        key={index} 
                        className="flex items-center w-full px-4 py-2 space-x-2 rounded-sm hover:bg-gray-700 ease-in duration-100 text-white" 
                        >
                            {console.log(platform.img)}
                            <img src={platform.img} alt={platform.platform} className="w-8 h-8" />
                            <span>{platform.platform}</span>
                        </DropdownMenuItem> :
                        console.log(platform)
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}