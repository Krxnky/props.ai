import { useSelector } from "react-redux";
// import { BarController, BarElement, CategoryScale, LinearScale } from "chart.js";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, XAxis, YAxis } from "recharts";
import { Legend, Tooltip } from "chart.js";

function translateLast10Data(data){
    const data_ = []
    data.forEach(element => {
        data_.push({
            "name" : element.isHome ? "vs. " : "@ " + element.vs,
            "amt": element.stat_score,
            "uv": element.stat_score
        })
    });
    return(data_)
}
export default function CustomChart() {
    const activePlayer = useSelector((state) => state.activePlayer.value)
    const [data, setData] = useState(translateLast10Data(activePlayer.lastTen))
    const [currentLineScore, setCurrentLineScore] = useState(activePlayer.line_score)
    useEffect(() => {
        console.log(activePlayer)
        console.log(data)
        console.log(currentLineScore)
    })
    return (
        <div className="">
            <BarChart width={600} height={250} data={data}>
                <CartesianGrid horizontal={false} vertical={false} height={currentLineScore}/>
                <ReferenceLine strokeDasharray={"25 25"} y={currentLineScore} />
                <XAxis dataKey="name" />
                <YAxis /> 
                <Tooltip />
                <Legend />
                <Bar dataKey="uv">
                    {
                        data.map((entry, index) =>(
                            <Cell key={`gameStatBar-${index}`} fill={entry.amt > currentLineScore ? "#66BB6A" : entry.amt == currentLineScore ? "#474747" : "#EF5350" } />
                        ))
                    }
                </Bar>
            </BarChart>
        </div>
        
    )
            
}