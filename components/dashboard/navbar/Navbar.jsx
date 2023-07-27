import { UserCircleIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import React, { useState } from "react";
import Menu from "@/components/utilities/Menu";
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
  const [open, setOpen] = useState(false);
  async function search(event) {
    event.preventDefault();
    let t = toast.loading("Searching ...");
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${value}`
      );
      const rawResult = await response.json();
      const result = rawResult["coins"].slice(0, 4).map((e) => e["api_symbol"]);
      if (result.length == 0) {
        toast.dismiss(t);
        toast.error("Limit of Api Calls exceeded");
      } else {
        setWatchList(result);
        setActiveSearch(true);
      }
    } catch (err) {
      toast.dismiss(t);
      toast.error("Something went wrong");
      setValue("");
    } finally {
      toast.dismiss(t);
    }
  }
  function handleChange(event) {
    if (event.key == "Enter") return search();
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
        <form
          action="#"
          onSubmit={search}
          className="w-[100%] block  outline-none "
        >
          <input
            className="w-[100%] block  outline-none "
            type="text"
            spellCheck="false"
            placeholder="Search By coinId"
            value={value}
            onChange={handleChange}
            onSubmit={search}
          />
        </form>
        <MagnifyingGlassIcon
          className="h-8 w-8 hover:cursor-pointer font-bold mr-4"
          onClick={search}
        />
      </div>
      <div className="flex items-center justify-end md:justify-evenly  ">
        <p className="border hidden md:block border-gray-300 rounded-3xl px-4 py-[2%]">
          {formater.format(balance)}
        </p>
        <UserCircleIcon
          className="text-gray-500 h-10 w-10 "
          onClick={() => setOpen((x) => !x)}
        />
        {open && <Menu />}
      </div>
    </div>
  );
}
