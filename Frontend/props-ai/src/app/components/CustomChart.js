import { useSelector } from "react-redux";
// import { BarController, BarElement, CategoryScale, LinearScale } from "chart.js";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";

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
    const renderCustomLabel = () => {
        <p>
        </p>
    }
    useEffect(() => {
        // console.log(activePlayer)
        // console.log(data)
        // console.log(currentLineScore)
    })
    return (
        <div className="">
            <ResponsiveContainer width={600} height={250}>
                
                <BarChart data={data}>
                    <CartesianGrid horizontal={false} vertical={false} height={currentLineScore}/>
                    <ReferenceLine strokeDasharray={"25 25"} y={currentLineScore} />
                    <XAxis dataKey="name" />
                    <YAxis /> 
                    <Tooltip content={<CustomTooltip data={data} />}/>
                    <Bar dataKey="uv" label={{ fill: '#708090', fontSize: 20, fontWeight: 'bold'}}>
                        {
                            data.map((entry, index) =>(
                                <Cell 

                                    key={`gameStatBar-${index}`} 
                                    fill={entry.amt > currentLineScore ? "#66BB6A" : entry.amt == currentLineScore ? "#474747" : "#EF5350" }
                                />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
        
    )
            
}