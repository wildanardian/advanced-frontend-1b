import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { watchlistRepository } from "../../services/watchlist/index";
import type { Content } from "@/features/film/film.types";

export const fetchWatchlist = createAsyncThunk('watchlist/fetch', async () => {
  return await watchlistRepository.getAll();
});

export const toggleWatchlist = createAsyncThunk(
  'watchlist/toggle',
  async (content: Content, { getState }) => {
    const state = getState() as { watchlist: { items: Content[] } };
    const exists = state.watchlist.items.some((item) => item.id === content.id);

    if (exists) {
      await watchlistRepository.remove(content.id);
    } else {
      await watchlistRepository.add(content);
    }
    return { content, wasAdded: !exists };
  }
)

interface WatchlistState {
  items: Content[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: WatchlistState = {
  items: [],
  status: 'idle',
}

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(toggleWatchlist.fulfilled, (state, action) => {
        const { content, wasAdded } = action.payload;
        state.items = wasAdded ? [...state.items, content] : state.items.filter((item) => item.id !== content.id);
      });
  }
})

export default watchlistSlice.reducer;











