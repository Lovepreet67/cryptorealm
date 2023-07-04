import React, { useState } from "react";
import Loading from "../utilities/Loading";

export default function Trade({ setMoney, setTransictions, setQuantity }) {
  const [buy, SetBuy] = useState(true);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  async function submitHandler(event) {
    setLoading(true);
    console.log("handler from trades");
    event.preventDefault();
    const data = {
      coinId: event.target.coinId.value,
      quantity: event.target.quantity.value,
    };
    console.log("value from the form  : ");
    console.log(data);
    const datajs = JSON.stringify(data);
    let response;
    if (buy)
      response = await fetch("/api/trade/buy", {
        method: "POST",
        body: datajs,
        redirect: "follow",
      });
    else
      response = await fetch("/api/trade/sell", {
        method: "POST",
        body: datajs,
        redirect: "follow",
      });
    const result = await response.json();
    setLoading(false);
    if (response.status == 200) {
      console.log(result["transiction"]);
      setErr("");
      setMoney(
        (money) =>
          money +
          (result["transiction"]["type"] == "sell" ? 1 : -1) *
            (result["transiction"]["price"] * result["transiction"]["quantity"])
      );
      setTransictions((t) => [result["transiction"], ...t]);
      setQuantity((q) => {
        let currCount = 0,
          price = 0,
          toAdd;
        q.forEach((e) => {
          if (e["coinId"] == result["transiction"]["coinId"]) {
            currCount = e["quantity"];
            price = e["price"];
            return;
          }
        });
        console.log(currCount);
        console.log(price);
        if (result["transiction"]["type"] == "sell") {
          const CoinSold = result["transiction"]["quantity"];
          const invested = result["transiction"]["invested"];
          toAdd = {
            coinId: result["transiction"]["coinId"],
            quantity: currCount - result["transiction"]["quantity"],
            price:
              (currCount * price - invested) /
              (currCount - result["transiction"]["quantity"]),
          };
        } else {
          console.log("inside buy ");
          console.log({
            currCount,
            price,
            quantity: result["transiction"]["quantity"],
            pricex: result["transiction"]["price"],
          });
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
    } else if (response.status == 400) {
      setErr(result["err"]);
    } else if (response.status == 404) {
      setErr("something went wrong");
    } else {
      alert("not handeled error occur");
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
          {!loading ? (
            <input
              type="submit"
              className=" px-3 bg-o font-semibold cursor-pointer py-1 w-[30%] border-o border-2 rounded-lg mx-auto text-lg"
              value={"Trade"}
            />
          ) : (
            <Loading size={4} />
          )}
        </div>
      </form>
    </div>
  );
}
