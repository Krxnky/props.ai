"use client"
import Image from "next/image";
import Link from "next/link";
import PropItem from "./dashboard/PropItem";
import { Provider } from "react-redux";
import { store } from "@/store/store";
// import getStaticProps from "@/requests/getStaticProps";


export default function Home() {
  
  return (
    <Provider store={store} >
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-900">
        <Link className="text-white" href={"/dashboard"}>Dashboard Link</Link>
        {/* {console.log(data)} */}
        {/* <PropItem player={{
              name: "Nikola Jokic",
              id: "203999",
          }}
          /> */}
          
      </main>
    </Provider>
  );
}
