import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../reducers/imageReducer.js";

export const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});
