import { useEffect } from "react"

export default function CustomTooltip({active, payload, label}){
    useEffect(() => {
        console.log(payload)
    }, [])
    return(
        <div className="flex h-5 w-5 p-5 bg-slate-500 opacity-90 items-center justify-center">
            {payload.length > 0 ? (
                <div className="">
                    <p>{payload[0].value}</p>
                </div>
            ) : (
            <div>Loading...</div>
        )}
        </div>
    )
}
