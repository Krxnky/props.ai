import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";

export default function Page() {
    return (
        <div className='flex-col min-h-screen justify-center  text-center items-center bg-zinc-900'>
            <Navbar />
            <Dashboard />
        </div>
    )
}