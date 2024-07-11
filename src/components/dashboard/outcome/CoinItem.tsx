import { currencyFormator } from "../board/CurrencyFormator.tsx";

export interface QuantityTransaction {
  coinId: string;
  avgPrice: number;
  quantity: number;
}

function CoinItem({ transaction }: { transaction: QuantityTransaction }) {
  return (
    <div
      className={
        "grid grid-cols-3 border-b-2 mx-4 px-2 rounded-xl mb-2 py-1 text-lg"
      }
    >
      <p>{transaction.coinId[0].toUpperCase() + transaction.coinId.slice(1)}</p>
      <p>{transaction.quantity}</p>
      <p>{currencyFormator.format(transaction.avgPrice)}</p>
    </div>
  );
}

export default CoinItem;
