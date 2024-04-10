import { Button } from "@nextui-org/react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"

export default function PropInfoModalContent(){
    const activePlayer = useSelector((state) => state.activePlayer.value)
    const dispatch = useDispatch()
    return(
        <div className="flex ease-out duration-300">
                    <dialog
                        className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-10 z-50 overflow-auto backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-zinc-900 m-auto p-8 rounded-md">
                            <div className="flex flex-row">
                                <h3 className="text-white">{activePlayer.player_name}</h3>
                                <br/>
                                <Button
                                    onClick={dispatch({type: 'propItemModal/changePropItemModal', payload: false})}
                                    className="bg-red-500 text-white p-2 "
                                >
                                    Close Modal
                                </Button>
                            </div>

                        </div>
                    </dialog>
                </div>
    )
}