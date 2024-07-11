import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { accumulate, addTransaction, ChangeByDate } from "./helper.ts";

export interface Transaction {
  coinId: string;
  price: number;
  updatedAt: Date;
  quantity: number;
  type: "sell" | "buy";
  investedMoney?: number;
}

export interface TransactionsState {
  loading: boolean;
  error: string | undefined;
  value: Transaction[];
  accumulatedCoins: object;
  changeByDate: ChangeByDate[];
}
const initialState: TransactionsState = {
  loading: true,
  error: undefined,
  value: [],
  accumulatedCoins: {},
  changeByDate: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    //   for populating the fields
    populate: (
      state: TransactionsState,
      action: PayloadAction<{
        error: string | undefined;
        value: undefined | Transaction[];
      }>,
    ) => {
      if (action.payload.error) {
        state.loading = false;
        state.error = action.payload.error;
      } else if (action.payload.value) {
        state.loading = false;
        state.value = action.payload.value;
        const { accumulatedCoins, changeByDate } = accumulate(state.value);
        state.changeByDate = changeByDate;
        state.accumulatedCoins = Object.fromEntries(accumulatedCoins);
      }
    },
    //    for adding new transactions
    add: (
      state: TransactionsState,
      action: PayloadAction<{ transaction: Transaction }>,
    ) => {
      state.value.push(action.payload.transaction);
      const accumulatedMap = addTransaction(
        action.payload.transaction,
        new Map<string, { quantity: number; averagePrice: number }>(
          Object.entries(state.accumulatedCoins),
        ),
        state.changeByDate,
      );
      state.accumulatedCoins = Object.fromEntries(accumulatedMap);
    },
  },
  selectors: {
    getAccumulatedCoins: (state: TransactionsState) => {
      return {
        error: state.error,
        loading: state.loading,
        accumulatedCoins: new Map(Object.entries(state.accumulatedCoins)),
      };
    },
    getProfitOrLoss: (state: TransactionsState) => {
      const len = state.changeByDate.length;
      if (len == 0)
        return {
          error: state.error,
          loading: state.loading,
          change: 0,
        };
      return {
        error: state.error,
        loading: state.loading,
        change: state.changeByDate[len - 1].change,
      };
    },
    getTransactions: (state: TransactionsState) => ({
      error: state.error,
      loading: state.loading,
      transactions: state.value,
    }),
    getChangeByDate: (state: TransactionsState) => ({
      error: state.error,
      loading: state.loading,
      changeByDate: state.changeByDate,
    }),
  },
});

export const { populate, add } = transactionSlice.actions;
export const {
  getTransactions,
  getAccumulatedCoins,
  getProfitOrLoss,
  getChangeByDate,
} = transactionSlice.selectors;
export default transactionSlice.reducer;
