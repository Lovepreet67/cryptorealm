// function tor modify date object as the "YYYYYY-MM-DD" so that we can do accumulation based on day
import { Transaction } from "./transaction.ts";

export interface ChangeByDate {
  change: number;
  date: string;
}

function getDate(date: Date) {
  const dateString = new Date(date).toISOString();
  return dateString.slice(0, dateString.indexOf("T"));
}

export function accumulate(transactions: Transaction[]) {
  //   now to specify the procedure we can follow this algorithm
  /*
   * 1. we create a map which will store the quantity and average price of the coin upto transactiosn we processed
   * 2. for current transaction we change the quantity and average price of the coin based on the transaction
   * 3. we will also maintain an array which will represent the profit/loss based on the day {date,profit/loss}
   * 4. one current object which will accumulate the data for the current date.
   * and when next date is encountered it will pushed to the array and we will not set it to
   * default value because the profit/loss for the current data is of interval [start,currentDate]
   * */
  const accumulatedCoins = new Map<
    string,
    { quantity: number; averagePrice: number }
  >();

  const changeByDate: ChangeByDate[] = [];

  transactions.forEach((transaction) => {
    addTransaction(transaction, accumulatedCoins, changeByDate);
  });
  return { accumulatedCoins: accumulatedCoins, changeByDate: changeByDate };
}

export function addTransaction(
  transaction: Transaction,
  accumulatedCoins: Map<string, { quantity: number; averagePrice: number }>,
  changeByDate: ChangeByDate[],
) {
  //   either it will be default or equal to the last entry of the change by date;
  const localAccumulator: ChangeByDate = changeByDate.pop() || {
    date: getDate(transaction.updatedAt),
    change: 0,
  };

  const date = getDate(transaction.updatedAt);

  // below condition is to check if current transaction is of other day than previous transaction
  // if so we can push the local accumulator to the array
  if (localAccumulator?.date != date) {
    changeByDate.push({ ...localAccumulator });
  } else if (localAccumulator?.date == date && transaction.type == "buy") {
    changeByDate.push({ ...localAccumulator });
  }
  // localAccumulator.date = date;

  //   if transaction is sell it means quantity will decrease;
  if (transaction.type == "sell") {
    const currValues = accumulatedCoins.get(transaction.coinId);
    const newQuantity = currValues?.quantity - transaction.quantity;
    // if all the coins are gone means we can safely remove item from the map;
    localAccumulator.change +=
      transaction.quantity * transaction.price - transaction?.investedMoney;
    if (newQuantity == 0) {
      accumulatedCoins.delete(transaction.coinId);
    }
    //   now we find whether the transaction will lead to profit or loss by comparing price with the avg price
    //     money for current transaction - money of coins according to average price
    // const transactionGain =
    //   transaction.price * transaction.quantity -
    //   transaction.quantity * currValues?.averagePrice;

    //   now we will change our local accumulater
    else {
      //   now we have to set the new average price and
      const newAveragePrice =
        (currValues?.quantity * currValues?.averagePrice -
          transaction.quantity * transaction.price) /
        newQuantity;

      //   updating values in the accumulater
      accumulatedCoins.set(transaction.coinId, {
        quantity: newQuantity,
        averagePrice: newAveragePrice,
      });
    }
  } else {
    //     first we will check if the coin of this type if not it will be new entry and we can just set values
    if (!accumulatedCoins.has(transaction.coinId)) {
      accumulatedCoins.set(transaction.coinId, {
        quantity: transaction.quantity,
        averagePrice: transaction.price,
      });
    } else {
      const currValues = accumulatedCoins.get(transaction.coinId);
      //   we can't gain or loss by buying coins it can be done only when we sell them so we don't have to worry about it.
      const newQuantity = transaction.quantity + currValues?.quantity;
      const newAvgPrice =
        (currValues?.quantity * currValues?.averagePrice +
          transaction.quantity * transaction.price) /
        newQuantity;

      accumulatedCoins.set(transaction.coinId, {
        quantity: newQuantity,
        averagePrice: newAvgPrice,
      });
    }
  }
  if (transaction.type == "sell") {
    localAccumulator.date = date;
    changeByDate.push({ ...localAccumulator });
  }
  return accumulatedCoins;
}
