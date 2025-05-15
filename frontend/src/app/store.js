import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice";
import placeReducers from "../features/place/placeSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    place: placeReducers, 
  },
});

export default store;
