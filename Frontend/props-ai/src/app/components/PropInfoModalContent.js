import { Button } from "@nextui-org/react"
import Link from "next/link"
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux"
import CustomChart from "./CustomChart";


export default function PropInfoModalContent(){
    const activePlayer = useSelector((state) => state.activePlayer.value)
    const dispatch = useDispatch()
    return(
        <div>
                    <dialog
                        className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-10 z-50 overflow-auto backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-zinc-900 m-auto p-8 rounded-md">
                            <div className="flex flex-col">
                                <Button
                                    onClick={() => dispatch({type: 'propItemModal/changePropItemModal', payload: false})}
                                >
                                    <Image 
                                        src={`/close.svg`}
                                        width={15}
                                        height={15}
                                        />
                                </Button>
                                <div className="flex-row">
                                    <Image 
                                        src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${activePlayer.player_id}.png`}
                                        width={175}
                                        height={175} 
                                        className="py-7"    
                                    />
                                    <div className="flex-row">

                                        <h3 className="text-white text-left font-semibold text-xl" >{activePlayer.player_name}</h3>
                                        <h3 className="text-white text-left font-light text-xl" >{activePlayer.player_team}</h3>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <CustomChart />
                        </div>
                    </dialog>
                </div>
    )
}