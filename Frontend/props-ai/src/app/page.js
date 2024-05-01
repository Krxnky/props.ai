"use client"
import Image from "next/image";
import Link from "next/link";
import PropItem from "./dashboard/PropItem";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Inconsolata } from "next/font/google";
import "./Main-Screen.css"
import { useEffect, useState } from "react";
// import getStaticProps from "@/requests/getStaticProps";

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['300']
})
export default function Home() {
  
  const [mainLinkHoverClassname, setMainLinkHoverClassname] = useState("animate-slide-out")

  useEffect(() => {
    console.log("mainLinkHoverClassname:" + mainLinkHoverClassname)
  })
  return (
    <Provider store={store} >
      <main className="flex min-h-screen flex-col items-center justify-center pb-20 bg-zinc-900">
        <Link 
          className="text-white" 
          // onMouseEnter={() => setMainLinkHoverClassname("animate-bounce")}
          // onMouseLeave={() => setMainLinkHoverClassname("hidden")}
          href={"/dashboard"}
          >
          <h1 className={`${inconsolata.className} text-6xl`}>PROPS.AI</h1>
          <h1 className={`${mainLinkHoverClassname} text-4xl font-extralight`}>GO</h1>   
        </Link>
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
