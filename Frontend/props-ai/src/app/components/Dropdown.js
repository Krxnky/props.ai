
"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"
import ppImage from "./platforms/pp.png"
import { Provider, useDispatch, useSelector } from "react-redux"
import { store } from "@/store/store"
import { changePlatform } from "@/store/platformSlice"

export default function Dropdown () {
    const [isActive,setIsActive] = useState(false)
    const platforms = 
    [ {
        platform: "PrizePicks",
        img: "./platforms/pp.png",
        id: 0,
    },
    {
        platform: "DraftKings",
        img: "/platforms/dk1.png",
        id: 1,
    },
    {
        platform: "Sleeper",
        img: "/platforms/sleeper.png",
        id: 2,
    }
]
    // const [activePlatform, setActivePlatform] = useState(platforms[0])  
    const activePlatform = useSelector((state) => state.platform.value)
    // const dispatch = useDispatch()
    console.log(activePlatform)
    return(
        
        <div className="flex">
            <DropdownMenu>
                <DropdownMenuTrigger 
                className="flex items-center justify-center w-full h-10 bg-gray-800 rounded-full hover:bg-gray-700">
                        {/* <img src="/platforms/pp.png" alt={activePlatform.platform} className="w-8 h-8" /> */}
                        <span className="text-white">{activePlatform.platform}</span>
                </DropdownMenuTrigger>
                {/* {console.log("activeapltform: ")}
                {console.log((activePlatform))}
                {console.log(activePlatform.platform == platforms[0].platform)} */}
                <DropdownMenuContent className="bg-gray-800 rounded-md">
                    {platforms.map((platform, index) => (
                        !(activePlatform.platform == platform.platform) ? 
                        <DropdownMenuItem 
                        onClick={useDispatch(changePlatform(platforms.find(id => platform.id)))}
                        key={index} 
                        className="flex items-center w-full px-4 py-2 space-x-2 hover:bg-gray-700" 
                        >
                            {console.log(platform.img)}
                            {/* <img src={platform.img} alt={platform.platform} className="w-8 h-8" /> */}
                            <span>{platform.platform}</span>
                        </DropdownMenuItem> :
                        console.log(platform)
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}