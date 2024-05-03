import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  movieName: null,
  startTime: null,
  duration: null,
  format: null,
  ticketPrice: null,
  showTimes: null,
  synopsis: null,
  rating: null,
  director: null,
  writer: null,
  cast: null,
  trailerUrl: null,
  posterUrl: null,
};

const movieInfoSlice = createSlice({
  name: "movieInfo",
  initialState,
  reducers: {
    setMovieInfo: (state = initialState, action) => {
      state.id = action.payload.id;
      state.movieName = action.payload.movieName;
      state.startTime = action.payload.startTime;
      state.duration = action.payload.duration;
      state.format = action.payload.format;
      state.ticketPrice = action.payload.ticketPrice;
      state.showTimes = action.payload.showTimes;
      state.synopsis = action.payload.synopsis;
      state.rating = action.payload.rating;
      state.director = action.payload.director;
      state.writer = action.payload.writer;
      state.cast = action.payload.cast;
      state.trailerUrl = action.payload.trailerUrl;
      state.posterUrl = action.payload.posterUrl;
    },
    resetMovieInfo: (state = initialState, action) => {
      state.id = null;
      state.movieName = null;
      state.startTime = null;
      state.duration = null;
      state.format = null;
      state.ticketPrice = null;
      state.showTimes = null;
      state.synopsis = null;
      state.rating = null;
      state.director = null;
      state.writer = null;
      state.cast = null;
      state.trailerUrl = null;
      state.posterUrl = null;
    },
  },
});

export const { setMovieInfo: setMovieDetails, resetMovieInfo: resetMovieDetails } = movieInfoSlice.actions;
export const movieDetailsReducer = movieInfoSlice.reducer;
