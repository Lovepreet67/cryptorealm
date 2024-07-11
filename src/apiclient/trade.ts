import { TradeFormData } from "../components/dashboard/Trade.tsx";
import toast from "react-hot-toast";
import { getSecurePostRequestOption } from "./utilities.ts";

async function sell(data: TradeFormData) {
  const requestOptions = getSecurePostRequestOption(data);
  const tl = toast.loading(
    "Selling " + data.coinId[0].toUpperCase() + data.coinId.slice(1),
  );
  const result = await fetch(
    `${process.env.BASE_URL}/trade/sell`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => {
      toast.error("Something went wrong", { id: tl });
      console.log("error happend in the sell trade : ", err);
    });
  if (result.error) toast.error(result.error, { id: tl });
  else toast.success("Sold " + data.coinId, { id: tl });

  return result;
}

async function buy(data: TradeFormData) {
  const requestOptions = getSecurePostRequestOption(data);
  const tl = toast.loading(
    "Buying " + data.coinId[0].toUpperCase() + data.coinId.slice(1),
  );
  const result = await fetch(
    `${process.env.BASE_URL}/trade/buy`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => {
      toast.error("Something went wrong", { id: tl });
      console.log("error happend in the Buy trade : ", err);
    });
  if (result.error) toast.error(result.error, { id: tl });
  else toast.success("Bought " + data.coinId, { id: tl });
  return result;
}

const trade = {
  sell,
  buy,
};
export default trade;
