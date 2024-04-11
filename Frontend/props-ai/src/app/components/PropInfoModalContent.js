import { Button } from "@nextui-org/react"
import Link from "next/link"
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux"

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
                                        width={25}
                                        height={25}
                                        />
                                </Button>
                                <h3 className="text-white">{activePlayer.player_name}</h3>
                                <br/>
                            </div>

                        </div>
                    </dialog>
                </div>
    )
}