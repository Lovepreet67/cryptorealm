import React, { useEffect } from "react";
import Image from "next/image";
import HeroImage from "./HeroImage";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
export default function Hero({ left, setLeft }) {
  console.log(((1 - left) * 100).toString());
  return (
    <div className="flex">
      <div
        className={`${
          left != 2 ? "hidden" : ""
        } md:block md:w-[60%] space-y-10 md:p-24 p-10 `}
      >
        <h1 className="md:text-5xl text-3xl font-bold">
          Dont’s loose real money to learn istead join crypto realm
        </h1>
        <p className="text-gray-500">
          cryptorealm is a platform for learning crypto trade without risk .
          join us and buy , sell coins virtually with virtual money but with
          real feel . join today and start learning.
        </p>
        <button
          className="button"
          onClick={() => {
            console.log(left);
            setLeft(1);
          }}
        >
          Join CryptoRealm
        </button>
      </div>
      <div
        className={`${
          left == 2 ? "hidden" : ""
        } block sm:flex flex-grow   justify-center  -z-0 mb-[85%] md:mb-auto md:w-[35%] relative  md:mt-14 m-auto`}
      >
        <div
          className={` m-auto transform transition-all duration-500 absolute   ${
            left == 1 ? "scale-100" : "scale-0"
          } duration-500 `}
        >
          <Signup />
        </div>
        <div
          className={` m-auto transform transition-all duration-500 absolute   ${
            left == 2 ? "scale-100" : "scale-0"
          } `}
        >
          <HeroImage />
        </div>
        <div
          className={`m-auto transform transition-all duration-500 absolute    ${
            left == 3 ? "scale-100" : "scale-0"
          } `}
        >
          <Login />
        </div>
      </div>
    </div>
  );
}
