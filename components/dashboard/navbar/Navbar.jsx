import { UserCircleIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";
import React, { useState } from "react";
const fetcher = (url) => fetch(url).then((r) => r.json());
const formater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export default function Navbar({
  balance,
  setActiveSearch,
  setWatchList,
  defaultValue,
}) {
  const [value, setValue] = useState("");
  async function search(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${value}`
      );
      const rawResult = await response.json();
      const result = rawResult["coins"].slice(0, 4).map((e) => e["api_symbol"]);
      setWatchList(result);
      setActiveSearch(true);
    } catch (err) {
      setValue("");
    }
  }
  function handleChange(event) {
    setValue(event.target.value);
    if (event.target.value.trim() == "") {
      setWatchList(defaultValue);
      setActiveSearch(false);
    }
  }
  return (
    <div className=" sticky font-semibold grid grid-cols-[80%_20%] md:grid-cols-[20%_60%_20%]  text-xl items-center px-4">
      <p className="flex-grow text-3xl col-span-2 md:col-span-1 font-bold">
        CryptoRealm
      </p>
      <div className="flex font-semibold w-[100%]  md:w-[80%] pl-3 rounded-2xl mt-2  border-2 border-o">
        <input
          className="w-[100%] block  outline-none "
          type="text"
          spellCheck="false"
          placeholder="Search By coinId"
          value={value}
          onChange={handleChange}
        />
        <MagnifyingGlassIcon
          className="h-8 w-8 hover:cursor-pointer font-bold mr-4"
          onClick={search}
        />
      </div>
      <div className="flex items-center justify-end md:justify-evenly  ">
        <p className="border hidden md:block border-gray-300 rounded-3xl px-4 py-[2%]">
          {formater.format(balance)}
        </p>
        <UserCircleIcon className="text-gray-500 h-10 w-10 " />
      </div>
    </div>
  );
}
