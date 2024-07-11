import LineChart from "./linechart.tsx";
import { useEffect, useState } from "react";
import Graph from "./Graph.tsx";
import { currencyFormator } from "./CurrencyFormator.tsx";
import details from "../../../apiclient/details.ts";
import Dummy from "../../utilities/Dummy.tsx";
interface BoardItemData {
  rank: number;
  id: string;
  price: number;
  d1: number;
  d7: number;
}
interface LoadingState {
  loading?: boolean;
  error: string;
}

function BoardItem({ coinId }: { coinId: string }) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<BoardItemData>({
    rank: 0,
    id: "",
    price: 0,
    d1: 0,
    d7: 0,
  });
  const [loading, setLoading] = useState<LoadingState>({
    loading: true,
    error: "",
  });

  useEffect(() => {
    (async () => {
      const coinDetails = await details.coinDetails(coinId);
      if (coinDetails.error?.length > 0) {
        setLoading({ loading: false, error: coinDetails.error });
      } else {
        setLoading({ loading: false, error: "" });
        setData({
          rank: coinDetails.market_cap_rank,
          id: coinDetails.id,
          price: coinDetails.current_price,
          d1: coinDetails.price_change_percentage_24h,
          d7: coinDetails.price_change_percentage_7d,
        });
      }
    })();
  }, [coinId]);
  if (loading.loading || loading.error.length > 0) {
    return (
      <div className={"min-h-10 md:min-h-16 flex items-center justify-center"}>
        <Dummy loading={loading.loading as boolean} error={loading.error} />
      </div>
    );
  }
  return (
    <div
      className={
        "grid grid-cols-[7%_16%_17%_35%] md:grid-cols-[7%_7%_10%_14%_12%_10%_15%] justify-evenly border-b-2 items-center py-2 "
      }
    >
      <p className={"hidden md:block "}>#{data.rank}</p>
      <img
        className={"h-7 aspect-square transition-all duration-200"}
        src={process.env.BASE_URL + "/coin_icon/" + data.id + ".webp"}
        alt={data.id}
      />
      <p className={"overflow-hidden whitespace-nowrap text-ellipsis"}>
        {data.id[0].toUpperCase() + data.id.slice(1)}
      </p>
      <p>{currencyFormator.format(data.price)}</p>
      <div className={"flex  justify-between"}>
        <p
          className={
            "ml-3 md:ml-0 text-center md:text-start " +
            (data.d1 < 0 ? "text-rose-500" : "text-green-500")
          }
        >
          {Math.round(data.d1 * 100) / 100}%
        </p>
        <img
          className={
            "aspect-square w-5 md:hidden transition-all duration-300  " +
            (visible ? "rotate-180" : "")
          }
          onClick={() => {
            if (!expanded) {
              setExpanded((expanded) => !expanded);
              setTimeout(() => {
                setVisible((visible) => !visible);
              }, 100);
            } else {
              setVisible((visible) => !visible);
              setTimeout(() => {
                setExpanded((expanded) => !expanded);
              }, 1000);
            }
          }}
          src={"/images/expand.svg"}
          alt={"dropdown"}
        />
      </div>

      <p
        className={
          "hidden md:block " +
          (data.d7 < 0 ? "text-rose-500" : "text-green-500")
        }
      >
        {Math.round(data.d7 * 100) / 100}%
      </p>
      <div className={"flex justify-between gap-3 items-center"}>
        <LineChart coinId={data.id} change={data.d7} />
        <img
          className={
            "aspect-square hidden md:block  h-5 md:h-7 transition-all duration-300  " +
            (visible ? "rotate-180" : "")
          }
          onClick={() => {
            if (!expanded) {
              setExpanded((expanded) => !expanded);
              setTimeout(() => {
                setVisible((visible) => !visible);
              }, 100);
            } else {
              setVisible((visible) => !visible);
              setTimeout(() => {
                setExpanded((expanded) => !expanded);
              }, 1000);
            }
          }}
          src={"/images/expand.svg"}
          alt={"dropdown"}
        />
      </div>
      {expanded && (
        <div
          className={
            "transition-all col-span-4 md:col-span-7 duration-700  opacity-0 " +
            (visible ? " opacity-100 h-64  " : "h-0")
          }
        >
          <Graph coinId={data.id} />
        </div>
      )}
    </div>
  );
}

export default BoardItem;
