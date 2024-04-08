"use client"
import Link from "next/link"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
// import { useRouter } from "next/router"

export default function PropInfoModal(){
    const searchParams = useSearchParams()
    const modal = searchParams.get("modal")
    const pathname = usePathname()
    const router = useRouter()
    return (
        <>
            {modal == "true" && 
                <div>
                    <dialog
                        className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center ease-in duration-300">
                        <div className="bg-zinc-900 m-auto p-8 rounded-md">
                            <div className="flex flex-row">
                                <h3 className="text-white">Modal content</h3>
                                <br/>
                                <Link
                                    href="?modal=false" 
                                    className="bg-red-500 text-white p-2 "
                                >
                                    Close Modal
                                </Link>
                            </div>

                        </div>
                    </dialog>
                </div>
            }
        </>
    )
}
