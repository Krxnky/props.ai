"use client"
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export default function Page(){
    const data = [
        {
            name: "first",
            uv: 4000,
            pv:2400
        },
        {
            name: "second",
            uv: 4000,
            pv:2400
        },
        {
            name: "third",
            uv: 4000,
            pv:2400
        },
        {
            name: "fourth",
            uv: 4000,
            pv:2400
        },
        {
            name: "fifth",
            uv: 4000,
            pv:2400
        },

    ]
    return(
        <>
            <BarChart width={730} height={250} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip ccursor={false}/>
                <Legend />
                <Bar dataKey="pv" stroke="#8884d8" fill="#8884d8" />
                <Bar dataKey="uv" stroke="#82ca9d" fill="#82ca9d" />
            </BarChart>
        </>
    )
}