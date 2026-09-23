import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Content, Film, Series } from "@/features/film/film.types";

interface DataState {
  films: Film[];
  series: Series[];
  watchlist: Content[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  films: [],
  series: [],
  watchlist: [],
  status: 'idle',
  error: null
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setFilms: (state, action: PayloadAction<Film[]>) => {
      state.films = action.payload;
      state.status = 'succeeded';
    },
    addFilm: (state, action: PayloadAction<Film>) => {
      state.films.push(action.payload);
    },
    updateFilm: (state, action: PayloadAction<Film>) => {
      const index = state.films.findIndex(film => film.id === action.payload.id);
      if (index !== -1) {
        state.films[index] = action.payload;
      }
    },
    deleteFilm: (state, action: PayloadAction<string>) => {
      state.films = state.films.filter(film => film.id !== action.payload);
    },
    setSeries: (state, action: PayloadAction<Series[]>) => {
      state.series = action.payload;
      state.status = 'succeeded';
    },
    setWatchlist: (state, action: PayloadAction<Content[]>) => {
      state.watchlist = action.payload;
      state.status = 'succeeded';
    },
    addToWatchlist: (state, action: PayloadAction<Content>) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter(item => item.id !== action.payload);
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const {
  setFilms,
  addFilm,
  updateFilm,
  deleteFilm,
  setSeries,
  setWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  setLoading,
  setError
} = dataSlice.actions;

export default dataSlice.reducer;
