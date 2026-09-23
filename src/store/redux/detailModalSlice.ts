import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedContentId: null,
}

const detailModalSlice = createSlice({
  name: 'detailModal',
  initialState,
  reducers: {
    openDetailModal: (state, action) => {
      state.selectedContentId = action.payload;
    },
    closeDetailModal: (state) => {
      state.selectedContentId = null;
    }
  }
});

export const { openDetailModal, closeDetailModal } = detailModalSlice.actions;
export default detailModalSlice.reducer;