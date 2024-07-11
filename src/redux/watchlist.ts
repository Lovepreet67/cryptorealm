import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WatchlistState {
  searchResult: string[];
  watchList: string[];
  loading: boolean;
  error: string | undefined;
}

const initialState: WatchlistState = {
  searchResult: [],
  watchList: [],
  loading: true,
  error: undefined,
};
export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    // add item to watchlist
    add: (
      state: WatchlistState,
      action: PayloadAction<{
        coinId: string;
      }>,
    ) => {
      state.watchList.push(action.payload.coinId);
    },

    // remove item from watchlist
    remove: (
      state: WatchlistState,
      action: PayloadAction<{ coinId: string }>,
    ) => {
      state.watchList = state.watchList.filter(
        (e) => e != action.payload.coinId,
      );
    },
    // populate the new watchlist
    populate: (
      state: WatchlistState,
      action: PayloadAction<{
        error: string | undefined;
        value: string[] | undefined;
      }>,
    ) => {
      if (action.payload.error) {
        state.loading = false;
        state.error = action.payload.error;
      } else if (action.payload.value) {
        state.loading = false;
        state.watchList = action.payload.value;
      }
    },
    //   add Search item
    addSearchResult: (
      state: WatchlistState,
      action: PayloadAction<{ coinId: string }>,
    ) => {
      state.searchResult.push(action.payload.coinId);
    },
    removeSearchResult: (state: WatchlistState) => {
      state.searchResult = [];
    },
  },
  selectors: {
    getWatchlist: (state: WatchlistState) => ({
      value:
        state.searchResult.length == 0 ? state.watchList : state.searchResult,
      error: state.error,
      loading: state.loading,
      type: state.searchResult.length == 0 ? "Watchlist" : "Search Result",
    }),
    getOrignalWatchlist: (state: WatchlistState) => {
      return { value: state.watchList };
    },
  },
});

export const { addSearchResult, removeSearchResult, add, remove, populate } =
  watchlistSlice.actions;

export const { getWatchlist, getOrignalWatchlist } = watchlistSlice.selectors;

export default watchlistSlice.reducer;
