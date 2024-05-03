// store.js
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { movieDetailsReducer } from "./slices/movie-info-slice";
import { showSelectionReducer } from "./slices/show-selection-slice";

const rootReducer = combineReducers({
  movieDetails: movieDetailsReducer,
  showSelection: showSelectionReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
