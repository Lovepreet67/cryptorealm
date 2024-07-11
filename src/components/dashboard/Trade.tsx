import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import trade from "../../apiclient/trade.ts";
import { useAppDispatch } from "../../redux/hooks.ts";
import { add as addTransaction } from "../../redux/transactions/transaction.ts";
import { updateBalance } from "../../redux/balance.ts";
export interface TradeFormData {
  coinId: string;
  quantity: number;
}
const TradeFromSchema: ZodType<TradeFormData> = z.object({
  coinId: z.string().min(1, { message: "Enter valid coinId" }),
  quantity: z.number().min(1, { message: "Enter valid Quantity" }),
});

function Trade() {
  const [state, setState] = useState("Buy");
  const dispatch = useAppDispatch();
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TradeFormData>({ resolver: zodResolver(TradeFromSchema) });

  const submitHandler = useCallback(
    async (data: TradeFormData) => {
      const result =
        state == "Sell" ? await trade.sell(data) : await trade.buy(data);
      if (result.error)
        return setError("coinId", { type: "coinId", message: result.error });
      // now we have to update the values of field according to transactions
      dispatch(
        addTransaction({
          transaction: {
            type: result.transiction.type,
            quantity: Number(result.transiction.quantity),
            price: Number(result.transiction.price),
            coinId: result.transiction.coinId,
            updatedAt: result.transiction.updatedAt,
            investedMoney: result.transiction?.investedMoney,
          },
        }),
      );
      if (result.transiction.type == "sell") {
        dispatch(
          updateBalance({
            amount:
              parseFloat(result.transiction.quantity) *
              parseFloat(result.transiction.price),
          }),
        );
      } else {
        dispatch(
          updateBalance({
            amount:
              -1 *
              parseFloat(result.transiction.quantity) *
              parseFloat(result.transiction.price),
          }),
        );
      }
      reset({ coinId: "", quantity: 0 });
    },
    [dispatch, reset, setError, state],
  );
  return (
    <div className={"h-full w-full shadow-md py-5 px-3 rounded-xl"}>
      <div className={"flex gap-10 w-full"}>
        <button
          className={
            "rounded-xl shadow-md px-4 py-2 text-xl w-full transition duration-500 " +
            (state == "Buy" ? "bg-primary " : "")
          }
          onClick={() => setState("Buy")}
        >
          Buy
        </button>
        <button
          className={
            "rounded-xl shadow-md px-4 py-2 text-xl w-full transition duration-500 " +
            (state == "Sell" ? "bg-primary " : "")
          }
          onClick={() => setState("Sell")}
        >
          Sell
        </button>
      </div>
      <div className={"flex flex-col gap-2 gap-y-5 items-center mt-3"}>
        <input
          placeholder={"Coin Id"}
          className={" border-b-2  outline-none w-[80%] "}
          {...register("coinId")}
        />
        <input
          placeholder={"Quantity"}
          type={"number"}
          className={" border-b-2  outline-none w-[80%] "}
          {...register("quantity", { valueAsNumber: true })}
        />
        <p className={" text-rose-500 -my-3 w-[80%]"}>
          {errors.coinId?.message || errors.quantity?.message || "\u2800"}
        </p>
        <button
          className={
            "bg-primary px-10 py-1 rounded-xl shadow-md text-xl font-bold transition-all duration-300 hover:-translate-y-2 active:-translate-y-1"
          }
          onClick={handleSubmit(submitHandler)}
        >
          {state}
        </button>
      </div>
    </div>
  );
}

export default Trade;
