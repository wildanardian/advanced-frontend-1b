import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DetailModalState {
  selectedContentId: string | null;
}

const initialState: DetailModalState = {
  selectedContentId: null,
}

const detailModalSlice = createSlice({
  name: 'detailModal',
  initialState,
  reducers: {
    openDetailModal: (state, action: PayloadAction<string>) => {
      state.selectedContentId = action.payload;
    },
    closeDetailModal: (state) => {
      state.selectedContentId = null;
    }
  }
});

export const { openDetailModal, closeDetailModal } = detailModalSlice.actions;
export default detailModalSlice.reducer;