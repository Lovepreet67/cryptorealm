import React from "react";
import WatchListItem from "../watchlist/WatchListItem";
export default function SearchResultList({ searchResult }) {
  return (
    <div className="p-3 rounded-3xl  shadow-xl">
      <h1 className="font-bold text-xl mb-4">Search Results</h1>
      <div className="grid grid-cols-4 sm:grid-cols-6  md:grid-cols-8 z-50 font-bold place-items-center    border-b pb-3 text-center rounded-xl">
        <p className=" md:block hidden">Rank</p>
        <p className="hidden sm:block">Icon</p>
        <p className="">Id</p>
        <p className="">Price</p>
        <p className={``}>1D</p>
        <p className={``}>7D</p>
        <p className="hidden sm:block">7d graph</p>
        <p className="hidden md:block"> remove</p>
      </div>
      <div className="overflow-scroll  scrollbar-hide pb-3">
        {/* {searchResult.map((e) => {
          return <WatchListItem />;
        })} */}
      </div>
    </div>
  );
}
