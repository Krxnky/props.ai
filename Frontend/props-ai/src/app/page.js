import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-900">
      <Link href={"/dashboard"}>Dashboard</Link>
    </main>
  );
}
