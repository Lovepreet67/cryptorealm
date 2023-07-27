import Head from "next/head";
import Navbar from "@/components/index/navbar/Navbar";
import LandMain from "@/components/index/LandMain";
import { Toaster } from "react-hot-toast";
import React, { useState } from "react";
export default function Home() {
  const [left, setLeft] = useState(2);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <div className="w-[100%]">
        <Navbar left={left} setLeft={setLeft}></Navbar>
        <LandMain left={left} setLeft={setLeft} />
      </div>
    </>
  );
}
