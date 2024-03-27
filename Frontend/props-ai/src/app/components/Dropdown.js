
"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"

export default function Dropdown () {
    const [isActive,setIsActive] = useState(false)
    const [activePlatform, setActivePlatform] = useState("PrizePicks")
    const platforms = 
       [ {
            platform: "PrizePicks",
            img: "/Frontend/props-ai/public/pp.png"
        },
        {
            platform: "DraftKings",
            img: "/Frontend/props-ai/public/dk1.png"
        },
        {
            platform: "Sleeper",
            img: "/Frontend/props-ai/public/sleeper.png"
        }
    ]
    return(
        <div className="flex">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <button className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700">
                        <img src="../../public/pp.png" alt="PrizePicks" className="w-8 h-8" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 rounded-md">
                    {platforms.map((platform, index) => (
                        <DropdownMenuItem key={index}>
                            <button className="flex items-center w-full px-4 py-2 space-x-2 hover:bg-gray-700" onClick={setActivePlatform(platform.platform)}>
                                <img src={platform.img} alt={platform.platform} className="w-8 h-8" />
                                <span>{platform.platform}</span>
                            </button>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}