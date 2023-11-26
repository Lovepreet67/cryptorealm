import React from "react";
import useSWR from "swr";
import { Line } from "react-chartjs-2";
import Loading from "@/components/utilities/Loading";
import { ChartBarIcon } from "@heroicons/react/24/solid";
export default function LineChart({ coin, color, type }) {
  const url =
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7";
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: dataRaw,
    error,
    isLoading,
  } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`,
    fetcher
  );
  if (isLoading) return <Loading size={4} />;
  if (error) {
    console.log(error);
    return <ChartBarIcon className="h-10 hidden sm:block" />;
  } else {
    const graphData = dataRaw["prices"]
      .map((e) => e[1])
      .filter((x, i) => i % 5 == 0);
    const data = {
      labels: [...Array(graphData.length).keys()],
      datasets: [
        {
          data: graphData,
          fill: false,
          pointRadius: 0,
          borderColor: color,
          borderWidth: 2,
          tension: 1.4,
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
      maintainAspectRatio: false,
    };
    console.log(data);
    return (
      <div className="hidden sm:block">
        <Line
          width={type ? 200 : 100}
          height={type ? 100 : 50}
          data={data}
          options={options}
        />
      </div>
    );
  }
}
