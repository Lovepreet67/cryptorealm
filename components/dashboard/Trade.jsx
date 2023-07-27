import React, { useState } from "react";
import Loading from "../utilities/Loading";
import toast from "react-hot-toast";

export default function Trade({ setMoney, setTransictions, setQuantity }) {
  const [buy, SetBuy] = useState(true);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  async function submitHandler(event) {
    event.preventDefault();
    setLoading(true);
    const data = {
      coinId: event.target.coinId.value,
      quantity: event.target.quantity.value,
    };
    const datajs = JSON.stringify(data);
    let response, t;
    if (buy) {
      t = toast.loading("Buying ...");
      response = await fetch("/api/trade/buy", {
        method: "POST",
        body: datajs,
        redirect: "follow",
      });
    } else {
      t = toast.loading("Selling ...");
      response = await fetch("/api/trade/sell", {
        method: "POST",
        body: datajs,
        redirect: "follow",
      });
    }
    const result = await response.json();
    if (response.status == 200) {
      setErr("");
      setMoney(
        (money) =>
          money +
          (result["transiction"]["type"] == "sell" ? 1 : -1) *
            (result["transiction"]["price"] * result["transiction"]["quantity"])
      );
      setTransictions((t) => [...t, result["transiction"]]);
      setQuantity((q) => {
        let currCount = 0,
          price = 0,
          toAdd;
        q.forEach((e) => {
          if (e["coinId"] == result["transiction"]["coinId"]) {
            currCount = e["quantity"];
            price = e["price"];
          }
        });
        if (result["transiction"]["type"] == "sell") {
          const CoinSold = result["transiction"]["quantity"];
          const invested = result["transiction"]["investedMoney"];
          toAdd = {
            coinId: result["transiction"]["coinId"],
            quantity: currCount - CoinSold,
            price: (currCount * price - invested) / (currCount - CoinSold),
          };
        } else {
          toAdd = {
            coinId: result["transiction"]["coinId"],
            quantity: currCount + result["transiction"]["quantity"],
            price:
              (currCount * price +
                result["transiction"]["quantity"] *
                  result["transiction"]["price"]) /
              (currCount + result["transiction"]["quantity"]),
          };
        }
        const filtered = q.filter(
          (e) => e["coinId"] != result["transiction"]["coinId"]
        );
        if (toAdd?.quantity != 0) return [...filtered, toAdd];
        return filtered;
      });
      toast.dismiss(t);
      toast.success("Transiction completed ");
      setLoading(false);
    } else if (response.status == 400) {
      toast.dismiss(t);
      toast.error(result["err"]);
      setErr(result["err"]);
      setLoading(false);
    } else {
      toast.dismiss(t);
      toast.error("Something went wrong");
      setErr("something went wrong");
      setLoading(false);
    }
  }
  return (
    <div className="shadow-xl px-3 py-3 space-y-7 rounded-xl md:pt-10 ">
      <div className="flex space-x-4 text-center">
        <p
          className={
            "border border-o p-1 flex-grow cursor-pointer font-semibold text-lg px-4 rounded-xl transition-all duration-500 " +
            (buy ? "bg-o" : "")
          }
          onClick={() => SetBuy(true)}
        >
          Buy
        </p>
        <p
          className={
            " border-o border-2 p-1 text-lg cursor-pointer font-semibold flex-grow px-4 rounded-xl transition-all duration-500 " +
            (!buy ? "bg-o" : "")
          }
          onClick={() => SetBuy(false)}
        >
          Sell
        </p>
      </div>
      <form
        onSubmit={submitHandler}
        className="space-y-4 w-[100%] flex-cols text-center items-center"
      >
        <input
          type="text"
          name="coinId"
          className="border-2 px-3 py-1 w-[100%] border-o rounded-lg outline-none text-lg"
          placeholder="Coin Id"
        />
        <br />
        <input
          type="number"
          name="quantity"
          className="border-2 px-3 py-1 w-[100%] border-o rounded-lg outline-none text-lg"
          placeholder="Quantity"
        />

        <br />
        <div>
          {err.size != 0 && <p className=" text-red-500">{err}</p>}
          <input
            type="submit"
            className=" px-3 bg-o font-semibold cursor-pointer py-1 w-[30%] border-o border-2 rounded-lg mx-auto text-lg"
            value={"Trade"}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
