import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountId: null,
  isLoggedIn: false,
  email: null,
  balance: null,
  loyaltyPoints: null,
};

const authSlice = createSlice({
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
