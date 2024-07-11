import { useCallback, useState } from "react";
import { PrimaryButton } from "../../utility";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { getBalanceState } from "../../redux/balance.ts";
import {
  addSearchResult,
  getWatchlist,
  removeSearchResult,
} from "../../redux/watchlist.ts";
import { useNavigate } from "react-router-dom";
import { currencyFormator } from "./board/CurrencyFormator.tsx";
import toast from "react-hot-toast";

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const stateHandler = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.document.cookie =
        "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    },
    [navigate],
  );

  const [open, setOpen] = useState(false);
  const { value: balance } = useAppSelector(getBalanceState);
  const { type } = useAppSelector(getWatchlist);
  return (
    <div className={"flex  md:mx-5 justify-between mt-3  mx-2"}>
      <div className={"text-2xl font-semibold md:block hidden"}>
        CryptoRealm
      </div>
      <form
        className={
          "w-[80%] md:w-[60%] border-2 rounded-xl px-6 items-center justify-center flex pr-2"
        }
        onSubmit={async (e: any) => {
          e.preventDefault();
          if (e.target.elements && e.target.elements["coinId"].value == "") {
            toast.error("enter id before searching");
            return;
          }
          if (type == "Watchlist")
            return dispatch(
              addSearchResult({ coinId: e.target.elements["coinId"].value }),
            );
          else return dispatch(removeSearchResult());
        }}
      >
        <input
          className={" w-full outline-none focus:text-black text-neutral-500"}
          placeholder={"Enter coinId"}
          name={"coinId"}
        />
        <button type={"submit"} className={"transition-all duration-1000"}>
          <img
            className={"aspect-square " + (type == "Watchlist" ? "h-7" : "h-5")}
            src={
              type == "Watchlist" ? "/images/search.svg" : "/images/cross.svg"
            }
            alt={"search"}
          />
        </button>
      </form>
      <div className={"hidden md:flex gap-5 text-lg items-center"}>
        <p className={"px-4 rounded-xl border-2"}>
          {new Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
          }).format(balance)}
        </p>
        <PrimaryButton title={"Logout"} onClick={(e) => stateHandler(e)} />
      </div>
      {/*  div for small screens*/}
      <div className={"flex flex-col items-end md:hidden"}>
        <button
          onClick={() => setOpen((open) => !open)}
          className={
            "transition-all duration-300 " + (open ? "rotate-180" : "rotate-0")
          }
        >
          {!open ? (
            <img
              className={"h-7 md:h-10  "}
              src={"/images/hamburger.svg"}
              alt={"Hamburger"}
            />
          ) : (
            <img
              className={"h-7 md:h-10 "}
              src={"/images/cross.svg"}
              alt={"Hamburger"}
            />
          )}
        </button>
        <div
          className={
            "flex flex-col text-xl items-start shadow-md rounded-xl px-5 gap-y-3 [&>*]:border-b-2  pb-3 z-50 fixed mt-10 bg-white transition-all duration-700 top-7 " +
            (!open ? "md:-right-32 -right-48" : "right-7 ")
          }
        >
          <p>{currencyFormator.format(balance)}</p>
          <button onClick={(e) => stateHandler(e)} className={"text-rose-500"}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
