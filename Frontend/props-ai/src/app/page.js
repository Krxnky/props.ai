import Image from "next/image";
import Link from "next/link";
import PropItem from "./dashboard/PropItem";
// import getStaticProps from "@/requests/getStaticProps";

export default function Home() {
  async function getStaticProps() {
    const response = await fetch('http://localhost:5000/props?platform=prizepicks');
    const data = await response.json();

    return {
        props: {
            jsonData: data
        }
    };
}
  const data = getStaticProps()
  console.log(data)
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
