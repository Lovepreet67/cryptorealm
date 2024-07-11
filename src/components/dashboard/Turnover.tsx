import { useAppSelector } from "../../redux/hooks.ts";
import { getProfitOrLoss } from "../../redux/transactions/transaction.ts";

const formater = Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});
function Turnover() {
  const { change } = useAppSelector(getProfitOrLoss);
  return (
    <div className={"rounded-xl  shadow-md py-2 px-3"}>
      <p
        className={
          "rounded-xl shadow-md w-fit py-1 px-7 font-extrabold text-xl mb-7"
        }
      >
        Financial Outcome
      </p>
      <div className={"  flex justify-evenly text-xl"}>
        <p className={"font-extrabold"}>{change < 0 ? "Loss" : "Profit"}</p>
        <p className={change < 0 ? "text-rose-500" : "text-green-500"}>
          {formater.format(Math.abs(change))}
        </p>
      </div>
    </div>
  );
}

export default Turnover;
