import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./watchlistSlice";
import detailModalReducer from "./detailModalSlice";
import authReducer from "./authSlice";
import dataReducer from "./dataReducer";

// File ini untuk menggabungkan semua slice reducer yang ada di aplikasi menjadi satu store tunggal. 
// Store ini akan digunakan untuk menyimpan state global aplikasi dan memungkinkan komponen-komponen React untuk mengakses dan memodifikasi state tersebut melalui Redux.
export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    detailModal: detailModalReducer,
    auth: authReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;