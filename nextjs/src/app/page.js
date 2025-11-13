'use client'
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  let [data, setData] = useState([])

  useEffect(() => {
    axios.get("https://nest.cybersoft.vn/product").then(result => {
      console.log(result)
      setData(result.data);
    })
  }, [])

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {data && data.map(item => {
          return <h1>
            {item.product_name}
          </h1>
        })}
      </main>
    </div>
  );
}
