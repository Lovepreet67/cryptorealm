import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import CoinItem from "./CoinItem.tsx";
import { useAppSelector } from "../../../redux/hooks.ts";
import {
  getAccumulatedCoins,
  getChangeByDate,
  getProfitOrLoss,
} from "../../../redux/transactions/transaction.ts";
import Dummy from "../../utilities/Dummy.tsx";

function Outcome() {
  const { changeByDate } = useAppSelector(getChangeByDate);
  const { change } = useAppSelector(getProfitOrLoss);
  const { accumulatedCoins } = useAppSelector(getAccumulatedCoins);

  const { options, graphData } = useMemo(() => {
    const graphData = {
      labels: changeByDate.map((e) => e.date),
      datasets: [
        {
          data: changeByDate.map((e) => e.change),
          fill: false,
          pointRadius: 4,
          borderColor: change < 0 ? "#f00" : "#0f0",
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
        },
        x: {
          display: false,
        },
      },
      maintainAspectRatio: false,
    };
    return { options, graphData };
  }, [change, changeByDate]);

  const [state, setState] = useState("fch");

  return (
    <div
      className={
        " row-span-1 col-span-2 rounded-xl shadow-md p-10 transition-all duration-1000 pb-3"
      }
    >
      <div className={"flex gap-5 mb-7"}>
        <p
          onClick={() => setState("fch")}
          className={
            "rounded-xl h-fit shadow-md px-3 md:px-7 py-1 w-fit  text-l font-bold transition-all cursor-pointer " +
            (state == "fch" ? "text-rose-500" : "")
          }
        >
          Profit/Loss
        </p>
        <p
          onClick={() => setState("coins")}
          className={
            "rounded-xl h-fit shadow-md px-3 md:px-7 py-1 w-fit  text-l font-bold transition-all cursor-pointer " +
            (state == "coins" ? "text-rose-500" : "")
          }
        >
          Coin List
        </p>
      </div>
      <div
        className={
          "h-0 md:h-fit overflow-hidden transition-all duration-1000 " +
          (state == "fch" ? "h-48" : `h-32`)
        }
      >
        {state == "fch" ? (
          graphData.datasets[0].data.length == 0 ? (
            <Dummy loading={false} nothing={true} />
          ) : (
            <Line
              data={graphData}
              options={options}
              height={window.innerWidth > 768 ? 200 : undefined}
            />
          )
        ) : accumulatedCoins.size == 0 ? (
          <Dummy loading={false} nothing={true} />
        ) : (
          <div
            className={
              "grid md:grid-cols-2 h-fit overflow-scroll scrollbar-hide"
            }
          >
            {Array.from(accumulatedCoins.keys()).map((t: string) => (
              <CoinItem
                key={t}
                transaction={{
                  coinId: t,
                  quantity: accumulatedCoins.get(t).quantity,
                  avgPrice: accumulatedCoins.get(t).averagePrice,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Outcome;
