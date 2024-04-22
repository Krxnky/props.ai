export default function CustomTooltip({active, payload, label}){
    
    return(
        <div className="flex h-5 w-5 bg-slate-500 opacity-70">
            <div className="">
                <p>{JSON.stringify(payload)}</p>
            </div>
        </div>
    )
}