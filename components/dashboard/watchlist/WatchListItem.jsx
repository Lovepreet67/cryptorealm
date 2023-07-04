import React, { useState } from "react";
import { MinusCircleIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import LineChart from "./LineChart";
import useSWR from "swr";
import Loading from "@/components/utilities/Loading";
const formater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export default function WatchListItem({ coin, setWatchList, activeSearch }) {
  const [full, setFull] = useState(false);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: dataRaw,
    error,
    isLoading,
  } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&developer_data=false&sparkline=false`,
    fetcher
  );
  if (isLoading) {
    return <Loading size={4} className={"m-auto"} />;
  }
  if (error) {
    console.log(error);
    return <></>;
  } else {
    console.log(dataRaw);
    const data = {
      name: dataRaw["name"],
      icon: dataRaw["image"]["large"],
      rank: dataRaw["market_cap_rank"],
      price: formater.format(dataRaw["market_data"]["current_price"]["usd"]),
      marketCap: formater.format(dataRaw["market_data"]["market_cap"]["usd"]),
      oneDay: dataRaw["market_data"]["price_change_percentage_24h"],
      sevenDay: dataRaw["market_data"]["price_change_percentage_7d"],
      homepage: dataRaw["links"]["homepage"][0],
    };
    console.log(data);
    // state for expanded and unexpande
    // handling the remove event
    async function handleRemove(event, coin) {
      event.preventDefault();
      const data = {
        coinId: coin,
        type: "remove",
      };
      const jsonData = JSON.stringify(data);
      // sending request
      const response = await fetch("/api/user/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const result = await response.json();
      // err handling
      if (response.status == 200) {
        setWatchList((watchlist) => watchlist.filter((e) => e != coin));
      } else {
        console.log(result.err);
      }
    }
    async function handleAdd(event, coin) {
      event.preventDefault();
      const data = {
        coinId: coin,
        type: "add",
      };
      const jsonData = JSON.stringify(data);
      // sending request
      const response = await fetch("/api/user/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const result = await response.json();
      // err handling
      if (response.status == 200) {
        setWatchList((watchlist) => watchlist.filter((e) => e != coin));
      } else {
        console.log(result.err);
      }
    }
    if (!full)
      return (
        <div className="sm:font-semibold grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 md:max-lg:grid-cols-8 place-items-center shadow-lg  text-center rounded-xl sm:p-1 py-2">
          <p className=" md:block hidden">#{data["rank"]} </p>
          <Image
            className="hidden sm:block"
            src={data["icon"]}
            width={40}
            height={40}
            alt="coin icon"
          />
          <p className=" cursor-pointer" onClick={() => setFull(true)}>
            {data["name"]}
          </p>
          <p className="">{data["price"]}</p>
          <p
            className={`${
              data["oneDay"] > 0 ? "text-green-500" : "text-red-500"
            } `}
          >
            {data["oneDay"].toFixed(2)}%
          </p>
          <p
            className={`${
              data["sevenDay"] > 0 ? "text-green-500" : "text-red-500"
            }   `}
          >
            {data["sevenDay"].toFixed(2)}%
          </p>
          <LineChart
            coin={coin}
            color={`${data["sevenDay"] > 0 ? "green" : "red"}`}
            className="hidden sm:block"
          />
          {activeSearch ? (
            <PlusCircleIcon
              className="text-green-500 h-6 w-6 hidden md:block cursor-pointer"
              onClick={(event) => handleAdd(event, coin)}
            />
          ) : (
            <MinusCircleIcon
              className="text-red-500 h-6 w-6 hidden md:block cursor-pointer"
              onClick={(event) => handleRemove(event, coin)}
            />
          )}
        </div>
      );
    else {
      return (
        <div className="relative">
          <XMarkIcon
            className="h-5 w-5 absolute top-1 left- bg-gray-300 rounded-full shadow-xl cursor-pointer"
            onClick={() => setFull(false)}
          />
          {activeSearch ? (
            <PlusCircleIcon
              className="text-green-500 h-6 w-6  cursor-pointer absolute top-1 right-1"
              onClick={(event) => handleAdd(event, coin)}
            />
          ) : (
            <MinusCircleIcon
              className="text-red-500 h-6 w-6  cursor-pointer absolute top-1 right-1"
              onClick={(event) => handleRemove(event, coin)}
            />
          )}
          <div className=" shadow-lg font-semibold grid sm:grid-cols-3 grid-cols-1  place-items-center text-center rounded-xl sm:p-1 py-2 md:p-4">
            {/* <p className="font-semibold hidden md:block">#{data["rank"]} </p> */}
            <div>
              <Image
                className="hidden sm:block"
                src={data["icon"]}
                width={100}
                height={100}
                alt="coin icon"
              />
              <p
                className="font-bold cursor-pointer"
                onClick={() => setFull(true)}
              >
                {data["name"]}
              </p>
            </div>
            <div className="text-left space-y-2">
              <p className="font-semibold"> Price {data["price"]}</p>
              <p
                className={`${
                  data["oneDay"] > 0 ? "text-green-500" : "text-red-500"
                } `}
              >
                <span className="text-black">One day change : </span>
                {data["oneDay"].toFixed(2)}%
              </p>
              <p
                className={`${
                  data["sevenDay"] > 0 ? "text-green-500" : "text-red-500"
                }   `}
              >
                <span className="text-black">Seven day change : </span>
                {data["sevenDay"].toFixed(2)}%
              </p>
              <p>Market cap : {data["marketCap"]}</p>
              <a
                className="shadow-sm transition-all rounded-md duration-500  hover:shadow-xl px-2   py-1"
                href={data["homepage"]}
              >
                visit Homepage
              </a>
            </div>
            <div>
              <LineChart
                coin={coin}
                color={`${data["sevenDay"] > 0 ? "green" : "red"}`}
                type={"big"}
                className="hidden sm:block w-44"
              />
              <p className="hidden sm:block">7 Day change</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
