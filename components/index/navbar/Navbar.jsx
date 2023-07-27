import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
export default function Navbar({ left, setLeft }) {
  const [active, setActive] = useState(false);
  return (
    <div className="flex px-4 md:pr-10 py-2 select-none  ">
      <p className="flex-grow text-3xl font-bold">CryptoRealm</p>
      {active || (
        <Bars3Icon
          className="sm:hidden h-10 cursor-pointer"
          onClick={() => setActive(true)}
        />
      )}
      <div
        className={`${
          active
            ? "flex-col space-y-2 text-right shadow-xl w-[30%] p-3 pl-0 rounded-lg absolute right-3 z-50"
            : "hidden"
        } sm:flex space-x-7 items-center text-gray-600 text-2xl cursor-pointer bg-white`}
      >
        {active && (
          <ChevronDoubleUpIcon
            className="h-10 font-bold cursor-pointer m-auto "
            onClick={() => setActive(false)}
          />
        )}
        <p
          className="hover:text-black "
          onClick={() => {
            toast("Yet to be implimented \nSorry for inconvenience");
          }}
        >
          About
        </p>
        <p
          className="hover:text-black"
          onClick={() => {
            toast("Yet to be implimented \nSorry for inconvenience");
          }}
        >
          Features
        </p>
        <p
          className="hover:text-black"
          onClick={() => {
            setActive(false);
            setLeft(3);
          }}
        >
          login
        </p>
        <p
          className="button mt-0 text-black"
          onClick={() => {
            console.log(left);
            setActive(false);
            setLeft(1);
          }}
        >
          signUp
        </p>
      </div>
    </div>
  );
}
