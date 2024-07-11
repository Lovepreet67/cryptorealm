import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface balanceState {
  loading: boolean;
  error: string | undefined;
  value: number | undefined;
}
const initialState: balanceState = {
  loading: true,
  error: undefined,
  value: 0,
};
export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    //   to update the balance
    updateBalance: (
      state: balanceState,
      action: PayloadAction<{ amount: number }>,
    ) => {
      state.value += action.payload.amount;
    },
    //   to populate the balance
    populate: (
      state: balanceState,
      action: PayloadAction<{
        value: number | undefined;
        error: string | undefined;
      }>,
    ) => {
      if (action.payload.error) state.error = action.payload.error;
      else state.value = action.payload.value;
    },
  },
  selectors: {
    getBalanceState: (state: balanceState) => state,
  },
});

export const { updateBalance, populate } = balanceSlice.actions;
export const { getBalanceState } = balanceSlice.selectors;
export default balanceSlice.reducer;
