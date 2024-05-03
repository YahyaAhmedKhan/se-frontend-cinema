import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  showTime: null,
  showDate: null,
  ticketPrice: 12.99,
  numSeats: 0,
  totalPrice: 0,
};

const showSelectionSlice = createSlice({
  name: "showSelection",
  initialState,
  reducers: {
    updateSelectedSeats: (state = initialState, action) => {
      state.selectedSeats = action.payload.selectedSeats;
      state.numSeats = action.payload.selectedSeats.length;
      state.totalPrice = action.payload.selectedSeats.length * state.ticketPrice;
    },
    resetSelectedSeats: (state = initialState, action) => {
      state.selectedSeats = [];
      state.numSeats = 0;
      state.totalPrice = 0;
    },
  },
});

export const { updateSelectedSeats, resetSelectedSeats } = showSelectionSlice.actions;
export const showSelectionReducer = showSelectionSlice.reducer;
