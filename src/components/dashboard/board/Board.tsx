import BoardItem from "./BoardItem.tsx";
import { useAppSelector } from "../../../redux/hooks.ts";
import { getWatchlist } from "../../../redux/watchlist.ts";
import Dummy from "../../utilities/Dummy.tsx";

function Board() {
  const {
    error,
    loading,
    value: watchlist,
    type,
  } = useAppSelector(getWatchlist);
  return (
    <div
      className={
        "md:h-full w-full shadow-md md:col-span-2 md:row-span-2 rounded-xl px-4 md:max-h-[23rem] py-0 "
      }
    >
      {}
      <div
        className={
          "px-3 font-bold text-xl shadow-md  w-fit md:px-10  rounded-xl md:mb-2"
        }
      >
        {type}
      </div>
      <div
        className={
          "grid grid-cols-[7%_14%_17%_35%]  md:grid-cols-[7%_7%_10%_14%_12%_10%_15%] py-1 justify-evenly  rounded-xl font-bold border-b-4"
        }
      >
        <p className={"hidden md:block"}>Rank</p>
        <p>Icon</p>
        <p>Id</p>
        <p>Price</p>
        <p>24H change</p>
        <p className={"hidden md:block"}>7d change</p>
        <p className={"hidden md:block"}>24H graph</p>
      </div>
      <div className={"max-h-72 overflow-scroll scrollbar-hide md:max-h-[80%]"}>
        {loading || error?.length > 0 || watchlist.length == 0 ? (
          <Dummy
            loading={loading}
            error={error}
            nothing={watchlist.length == 0}
            //TODO: - check if size is correct
            size={10}
          />
        ) : (
          watchlist.map((coinId) => {
            return <BoardItem key={coinId} coinId={coinId} />;
          })
        )}
      </div>
    </div>
  );
}

export default Board;
