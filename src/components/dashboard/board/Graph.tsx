import { useEffect, useMemo, useState } from "react";
import details from "../../../apiclient/details.ts";
import { Line } from "react-chartjs-2";
import {
  addToWatchList,
  removeFromWatchList,
} from "../../../apiclient/update.ts";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";

import {
  add as addToReduxWatchlist,
  getOrignalWatchlist,
} from "../../../redux/watchlist.ts";
import { remove as removeFromReduxWatchlist } from "../../../redux/watchlist.ts";

import { currencyFormator } from "./CurrencyFormator.tsx";
const numberFormater = Intl.NumberFormat("en-us", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

// options for the date
const options1d: Intl.DateTimeFormatOptions = {
  hour: "numeric", // numeric hour
  minute: "numeric", // numeric minute
};
const options7_30d: Intl.DateTimeFormatOptions = {
  month: "numeric", // full month name
  day: "numeric", // numeric day of the month
  hour: "numeric", // numeric hour
};

const filterGraph = (type: string, data: [number]) => {
  if (window.innerWidth <= 768) {
    //   it means we are on mobile so
    if (type == "1d") {
      const interval = Math.max(1, Math.floor(data.length / 72));
      return data.filter((v, i) => i % interval == 0);
    } else if (type == "7d") {
      const interval = Math.max(1, Math.floor(data.length / 72));
      return data.filter((v, i) => i % interval == 0);
    } else {
      const interval = Math.max(1, Math.floor(data.length / 72));
      return data.filter((v, i) => i % interval == 0);
    }
  } else {
    //   it means we are on big screen so
    if (type == "1d") {
      const interval = Math.max(1, Math.floor(data.length / 200));
      return data.filter((v, i) => i % interval == 0);
    } else if (type == "7d") {
      const interval = Math.max(1, Math.floor(data.length / 200));
      return data.filter((v, i) => i % interval == 0);
    } else {
      const interval = Math.max(1, Math.floor(data.length / 200));
      return data.filter((v, i) => i % interval == 0);
    }
  }
};

function Graph({ coinId }: { coinId: string }) {
  const [graphType, setGraphType] = useState("1d");
  const [graphData, setGraphData] = useState([]);
  const [change, setChange] = useState(0);
  const { value } = useAppSelector(getOrignalWatchlist);
  const [watchlistMode, setWatchListMode] = useState(
    value.indexOf(coinId) != -1 ? "remove" : "add",
  );

  // redux
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      setGraphData([]);
      if (graphType == "1d") {
        //     fetch data as the 1day
        const { prices } = await details.oneDayCoinDetails(coinId);
        if (!prices) return;
        setChange(
          ((prices[prices.length - 1][1] - prices[0][1]) / prices[0][1]) * 100,
        );
        setGraphData(filterGraph("1d", prices));
      } else if (graphType == "7d") {
        //     fetch data for the 7d
        const { prices } = await details.sevenDayCoinDetails(coinId);
        if (!prices) return;
        setChange(
          ((prices[prices.length - 1][1] - prices[0][1]) / prices[0][1]) * 100,
        );
        setGraphData(filterGraph("7d", prices));
      } else if (graphType == "30d") {
        //     fetch data for the 30d
        const { prices } = await details.thirtyDayCoinDetails(coinId);
        if (!prices) return;
        setChange(
          ((prices[prices.length - 1][1] - prices[0][1]) / prices[0][1]) * 100,
        );
        setGraphData(filterGraph("30d", prices));
      }
    })();
  }, [coinId, graphType]);

  // graph data
  const { data, options } = useMemo(() => {
    const data = {
      labels: graphData.map((e) =>
        new Date(e[0]).toLocaleString(
          "en-us",
          graphType == "1d" ? options1d : options7_30d,
        ),
      ),
      datasets: [
        {
          data: graphData.map((e) => e[1]),
          formatter: (value) => currencyFormator.format(value),
          fill: false,
          pointRadius: 0,
          borderColor: change < 0 ? "rgb(244,63,94)" : "#0f0",
          borderWidth: 2,
          tension: 0.2,
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
          display: true,
          ticks: {
            callback: function (label) {
              if (label > 1000) return label / 1000 + "k";
              return numberFormater.format(label);
            },
          },
        },
        x: {
          display: false,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    };
    return { data, options };
  }, [change, graphData, graphType]);
  return (
    <div className={"w-full mt-4 md:mt-3"}>
      <div className={"flex justify-between"}>
        <div className={"flex w-fit gap-x-3"}>
          <div
            onClick={() => setGraphType("1d")}
            className={
              "text-sm md:text-lg px-2 md:px-5 py-0.5 border-[1px] md:border-2 rounded-xl transition-all cursor-pointer " +
              (graphType == "1d" ? "text-rose-500" : "")
            }
          >
            1 Day
          </div>
          <div
            onClick={() => setGraphType("7d")}
            className={
              "text-sm md:text-lg px-2 md:px-5 py-0.5 border-[1px] md:border-2 rounded-xl transition-all cursor-pointer " +
              (graphType == "7d" ? "text-rose-500" : "")
            }
          >
            7 Day
          </div>
          <div
            onClick={() => setGraphType("30d")}
            className={
              "text-sm md:text-lg px-2 md:px-5 py-0.5 border-[1px] md:border-2 rounded-xl transition-all cursor-pointer " +
              (graphType == "30d" ? "text-rose-500 " : "")
            }
          >
            30 Day
          </div>
        </div>
        <div className={"flex gap-x-3 "}>
          <p className={change < 0 ? "text-rose-500" : "text-green-500"}>
            {Math.round(change * 100) / 100}%
          </p>

          {/*adding the watchlist functionality*/}
          <div
            onClick={async () => {
              const t = toast.loading(
                watchlistMode == "add"
                  ? "Adding coin to Watchlist"
                  : "Removing coin from Watchlist",
              );
              const result =
                watchlistMode == "remove"
                  ? await removeFromWatchList(coinId)
                  : await addToWatchList(coinId);
              if (result.error) {
                toast.error("Operation Failed", { id: t });
              } else {
                if (watchlistMode == "add") {
                  dispatch(addToReduxWatchlist({ coinId }));
                } else {
                  dispatch(removeFromReduxWatchlist({ coinId }));
                }
                toast.success(
                  `${coinId[0].toUpperCase() + coinId.slice(1)} ${watchlistMode == "add" ? "Added to" : "Removed from"} Watchlist`,
                  { id: t },
                );
                setWatchListMode((curr) => (curr == "add" ? "remove" : "add"));
              }
            }}
          >
            {watchlistMode == "add" ? (
              <img
                src={"./images/add_watchlist.svg"}
                alt={"add"}
                className={"aspect-square h-4 md:h-7 cursor-pointer"}
              />
            ) : (
              <img
                src={"./images/remove_watchlist.svg"}
                alt={"remove"}
                className={"aspect-square h-4 md:h-7 cursor-pointer"}
              />
            )}
          </div>

          {/*  watchlist functionality ends*/}
        </div>
      </div>
      <div className={" px-3 md:px-10 mt-1 "}>
        <Line data={data} options={options} height={200} />
      </div>
    </div>
  );
}

export default Graph;
