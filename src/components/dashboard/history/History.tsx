import HistoryItem from "./HistoryItem.tsx";
import { useAppSelector } from "../../../redux/hooks.ts";
import { getTransactions } from "../../../redux/transactions/transaction.ts";
import Dummy from "../../utilities/Dummy.tsx";

function History() {
  const { error, loading, transactions } = useAppSelector(getTransactions);
  return (
    <div className={"h-80 w-full shadow-md rounded-xl px-3"}>
      <div
        className={" font-bold text-xl shadow-md  w-fit px-10  rounded-xl mb-4"}
      >
        Transaction History
      </div>
      <div
        className={
          "grid grid-cols-[10%_12%_20%]  md:grid-cols-[10%_12%_10%_16%_10%_25%] justify-between p-5 md:pl-5 font-bold text-l  rounded-xl border-b-4 py-1 mb-3 "
        }
      >
        <div>CoinId</div>
        <div>Icon</div>
        <div>Quantity</div>
        <div className={"hidden md:block"}>Price</div>
        <div className={"hidden md:block"}>Type</div>
        <div className={"hidden md:block"}>Date</div>
      </div>
      {error?.length == 0 || loading || transactions.length == 0 ? (
        <Dummy
          loading={loading}
          error={error}
          nothing={transactions.length == 0}
          size={7}
        />
      ) : (
        <div
          className={
            "h-[70%] overflow-scroll  overflow-x-hidden scrollbar-hide " +
            "first:bg-red"
          }
        >
          {[...transactions].reverse().map((transaction) => (
            <HistoryItem key={transaction.updatedAt} {...transaction} />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
