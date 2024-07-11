import { configureStore } from "@reduxjs/toolkit";
import watchlist from "./watchlist.ts";
import balance from "./balance.ts";
import transactions from "./transactions/transaction.ts";

export const store = configureStore({
  reducer: {
    watchlist: watchlist,
    balance: balance,
    transactions: transactions,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
