import { Transaction } from "../../../redux/transactions/transaction.ts";

import { currencyFormator } from "../board/CurrencyFormator.tsx";
import { useState } from "react";
function HistoryItem({
  coinId,
  quantity,
  updatedAt,
  price,
  type,
}: Transaction) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={"flex flex-col"}>
      <div
        className={
          "grid grid-cols-[10%_12%_20%] md:grid-cols-[10%_12%_10%_16%_10%_25%] w-full justify-between border-b-2 pl-5 py-1 items-center text-lg"
        }
      >
        <div>{coinId[0].toUpperCase() + coinId.slice(1)}</div>
        <img
          className={"aspect-square w-7"}
          src={`${process.env.BASE_URL}/coin_icon/${coinId}.webp`}
          alt={"coin Image"}
        />
        <div className={"flex justify-between md:block "}>
          {quantity}
          <div
            className={
              "block md:hidden transition-all duration-300 cursor-pointer " +
              (expanded ? "rotate-180" : "")
            }
            onClick={() => {
              setExpanded((curr) => !curr);
            }}
          >
            <img src={"./images/expand.svg"} alt={"expand"} />
          </div>
        </div>
        <div className={"hidden md:block"}>
          {currencyFormator.format(price)}
        </div>
        <div
          className={
            "hidden md:block " +
            (type == "buy" ? "text-green-500" : "text-rose-500")
          }
        >
          {type == "buy" ? "Bought" : "Sold"}
        </div>
        <div className={"hidden md:block"}>
          {new Date(updatedAt).toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
      </div>
      <div
        className={
          "transition-all flex justify-between duration-700 overflow-hidden mx-7 " +
          (expanded ? "h-10" : "h-0")
        }
      >
        <div
          className={
            "flex gap-1  gap " +
            (type == "sell" ? "text-green-500" : "text-rose-500")
          }
        >
          <div>{type == "sell" ? "+ " : "- "}</div>

          {currencyFormator.format(price)}
        </div>
        <div>
          {new Date(updatedAt).toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}

export default HistoryItem;
