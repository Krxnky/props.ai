"use client"
import Link from "next/link"
import PropInfoModalContent from "./PropInfoModalContent"
import { Provider, useSelector } from "react-redux"
import { store } from "@/store/store"
import { useEffect } from "react"
// import { useRouter } from "next/router"

export default function PropInfoModal(){
    const modalActive = useSelector((state) => state.propItemModal.value)
    useEffect(() => {
        console.log(modalActive)
    })
    return (
        <>
            {modalActive && 
                <PropInfoModalContent/>
            }
        </>
    )
}
