// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { Content } from "@/features/film/film.types";
// import type { RootState } from './index';

// interface WatchlistState {
//   items: Content[];
// }

// const initialState: WatchlistState = {
//   items: [],
// }

// const watchlistSlice = createSlice({
//   name: 'watchlist',
//   initialState,
//   reducers: {
//     toggleWatchlist: (state, action: PayloadAction<Content>) => {
//       const exist = state.items.some((item) => item.id === action.payload.id);
//       if (exist) {
//         state.items = state.items.filter((item) => item.id !== action.payload.id);
//       } else {
//         state.items.push(action.payload);
//       }
//       console.log('isi dari watchlist sekarang:', state.items);
//     }
//   }
// });

// // export semua reducer yang ada di slice ini agar bisa digunakan di store
// export const { toggleWatchlist } = watchlistSlice.actions;
// export default watchlistSlice.reducer;

// export const selectIsInWatchlist = (contentId: string) => (state: RootState) =>
//   state.watchlist.items.some((item) => item.id === contentId);


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Content } from "@/features/film/film.types";
import { watchlistRepository } from "@/services/watchlist";

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











