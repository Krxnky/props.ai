import Image from "next/image";
import Link from "next/link";
import PropItem from "./dashboard/PropItem";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-900">
      <Link className="text-white" href={"/dashboard"}>Dashboard Link</Link>
      {/* <PropItem player={{
            name: "Nikola Jokic",
            id: "203999",
        }}
        /> */}
        
    </main>
  );
}
