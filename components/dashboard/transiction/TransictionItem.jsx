import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import Loading from "@/components/utilities/Loading";
const formater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
function getDate(time) {
  const date = new Date(time);
  const now = new Date();
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(date);
  }
  return Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "Asia/KolKata",
  })
    .format(date)
    .substring(0, 6);
}
export default function TransictionItem({ time, coin, type, total, quantity }) {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, isLoading, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
    fetcher
  );
  // const [loading, setLoading] = useState(true);
  // const [imageError, setImageError] = useState(false);
  // if (error) setImageError(false);
  // console.log(data);
  return (
    <div className="sm:font-semibold grid grid-cols-5 sm:grid-cols-6 shadow-lg rounded-xl text-center content-center items-center px-4 py-1">
      <p className="hidden sm:block">{coin}</p>
      {isLoading ? (
        <Loading size={4} />
      ) : error ? (
        <Image
          src={"/images/default_coin.png"}
          alt="thumb"
          className="block m-auto"
          width={40}
          height={40}
        />
      ) : (
        <Image
          src={data["image"]["large"]}
          alt="thumb"
          className="block m-auto"
          width={40}
          height={40}
        />
      )}
      {type === "sell" ? (
        <p className="text-red-500">Sell</p>
      ) : (
        <p className=" text-green-500">Buy</p>
      )}
      <p>{quantity}</p>
      <p>{getDate(time)}</p>
      <p className={`${type === "sell" ? "text-green-500 " : "text-red-500"}`}>
        {`${(type === "sell" ? "+" : "-") + formater.format(Math.abs(total))}`}
      </p>
    </div>
  );
}
