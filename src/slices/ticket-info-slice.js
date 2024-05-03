import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieName: null,
  selectedSeats: [],
  total: null,
  serviceCharges: null,
  totalTax: null,
  netTotal: null,
  loyaltyPoints: null,
};

const ticketInfoSlice = createSlice({
  name: "showSelection",
  initialState,
  reducers: {
    updateTicketInfo: (state = initialState, action) => {
      state.selectedSeats = action.payload.selectedSeats;
      state.numSeats = action.payload.numSeats;
      state.totalPrice = action.payload.totalPrice;
      state.serviceCharge = action.payload.serviceCharge;
      state.tax = action.payload.tax;
      state.totalOrderAmount = action.payload.totalOrderAmount;
      state.loyaltyPoints = action.payload.loyaltyPoints;
    },
    resetTicketInfo: (state = initialState, action) => {
      state.selectedSeats = [];
      state.numSeats = null;
      state.totalPrice = null;
      state.serviceCharge = null;
      state.tax = null;
      state.totalOrderAmount = null;
      state.loyaltyPoints = null;
    },
  },
});

export const { updateTicketInfo, resetTicketInfo } = ticketInfoSlice.actions;
export const showSelectionReducer = ticketInfoSlice.reducer;
