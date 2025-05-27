import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice";
import placeReducers from "../features/place/placeSlice";
import bookingReducers from "../features/booking/bookingSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    place: placeReducers, 
    booking: bookingReducers,
  },
});

export default store;
