import Trade from "@/components/dashboard/Trade";
import Watchlist from "@/components/dashboard/watchlist/Watchlist";
import TransictionList from "@/components/dashboard/transiction/TransictionList";
import Navbar from "@/components/dashboard/navbar/Navbar";
import Info from "@/components/dashboard/Info";
import SearchResultList from "@/components/dashboard/search/SearchResultList";
import React, { useEffect, useState } from "react";
import Loading from "@/components/utilities/Loading";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
export default function DashBoard({ user }) {
  const router = useRouter();
  if (!user) {
    router.push("/");
  }
  const [watchList, setWatchList] = useState(user["watchlist"]);
  const [transictions, setTransictions] = useState(user["transictions"]);
  const [money, setMoney] = useState(user["money"]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [quantity, setQuantity] = useState([]);
  useEffect(() => {
    const map = new Map();
    user["quantityArray"].forEach((e) => {
      if (map.has(e["coinId"])) {
        const pre = map.get(e["coinId"]);
        map.set(e["coinId"], {
          coinId: e["coinId"],
          quantity: pre["quantity"] + e["quantity"],
          price:
            (pre["price"] * pre["quantity"] + e["quantity"]) /
            (pre["quantity"] + e["quantity"]),
        });
      } else {
        map.set(e["coinId"], e);
      }
    });
    setQuantity(Array.from(map.values()));
  }, [user]);
  const temp = transictions.reduce((acc, e) => {
    if (e["type"] == "sell") {
      acc += -e["investedMoney"] + e["quantity"] * e["price"];
      return acc;
    } else return acc;
  }, 0);
  return (
    // <Loading size={5} />
    <div className="md:py-6 md:px-10 p-3">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar
        balance={money}
        setActiveSearch={setActiveSearch}
        setWatchList={setWatchList}
        defaultValue={watchList}
      />
      <div className="grid md:grid-cols-[60%_37%] gap-x-10 gap-y-7">
        <Watchlist
          list={watchList}
          setWatchList={setWatchList}
          activeSearch={activeSearch}
        />
        <Trade
          className=""
          setTransictions={setTransictions}
          setMoney={setMoney}
          setQuantity={setQuantity}
        />
        <TransictionList list={transictions} />
        <Info
          username={user["username"]}
          money={money}
          change={temp}
          quantity={quantity}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = {
    token: context.req.cookies["jwt"],
  };
  try {
    const response = await fetch(process.env.MAIN_URL + "/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });
    const result = await response.json();
    if (response.status == 400) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
    if (response.status == 200) return { props: { user: result["user"] } };
  } catch (err) {
    return { props: { err: "something went wrong try again" } };
  }
}
