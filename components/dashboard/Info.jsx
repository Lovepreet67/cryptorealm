import React from "react";
import Nothing from "../utilities/Nothing";
const formater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export default function Info({ username, money, change, quantity }) {
  return (
    <div className="shadow-xl p-3  rounded-2xl">
      <p className="font-bold text-2xl">{username}</p>
      <p className="block md:hidden">Balance : {formater.format(money)}</p>
      {change >= 0 ? (
        <p className="text-green-500">
          profit : {formater.format(Math.abs(change))}
        </p>
      ) : (
        <p className="text-red-500 md:font-semibold">
          loss : {formater.format(Math.abs(change))}
        </p>
      )}
      <p className="my-3 font-semibold text-xl">Quantity</p>
      <div className="pb-3  p-3">
        <div className="grid font-semibold grid-cols-3 place-content-center shadow-xl rounded-lg h-10 text-center ">
          <p>Id</p>
          <p>Quantity</p>
          <p>price(avg)</p>
        </div>
        {quantity.length != 0 ? (
          quantity.map((e) => {
            return (
              <div
                key={e["coinId"]}
                className="grid md:font-semibold grid-cols-3 place-content-center shadow-xl py-2  rounded-lg text-center overflow-scroll scrollbar-hide"
              >
                <p>{e["coinId"]}</p>
                <p>{e["quantity"]}</p>
                <p>{formater.format(e["price"])}</p>
              </div>
            );
          })
        ) : (
          <Nothing />
        )}
      </div>
    </div>
  );
}
