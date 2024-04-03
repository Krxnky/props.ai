"use client"
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";
import { store } from "@/store/store";

export default function Page() {
    return (
        <Provider store={store}>
            
            <div className='flex-col min-h-screen justify-center  text-center items-center bg-zinc-900'>
                <Navbar />
                <Dashboard />
            </div>
        </Provider>
    )
}