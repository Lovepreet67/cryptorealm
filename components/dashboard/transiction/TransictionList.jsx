import React from "react";
import TransictionItem from "./TransictionItem";
import Nothing from "@/components/utilities/Nothing";

export default function TransitionList({ list }) {
  return (
    <div className="p-3 rounded-3xl h-[300px] border shadow-xl ">
      <h1 className="font-bold text-xl mb-4">Transictions</h1>
      <div className="font-bold grid grid-cols-5 sm:grid-cols-6 shadow-lg rounded-xl text-center content-center items-center pb-3">
        <p className="hidden sm:block">Id</p>
        <p>Icon</p>
        <p>Type</p>
        <p>Quantity</p>
        <p>Time</p>
        <p>Total</p>
      </div>
      <div className="overflow-scroll scrollbar-hide h-[70%] ">
        {list.length != 0 ? (
          list.reverse().map((e) => {
            return (
              <TransictionItem
                coin={e["coinId"]}
                type={e["type"]}
                quantity={e["quantity"]}
                time={e["createdAt"]}
                total={(e["quantity"] * e["price"]).toFixed(2)}
                key={e["_id"]}
              />
            );
          })
        ) : (
          <Nothing />
        )}
      </div>
    </div>
  );
}
