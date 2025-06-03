import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance";

export const showBooking = createAsyncThunk(
    "/showbooking",
    async(_, {rejectWithValue})=>{
        try {
            const res = await axiosInstance.get('/showbooking');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Show Booking Failed");
        }
    }
)

export const handleAcceptBooking = createAsyncThunk(
    "/acceptbooking",
    async(bookingid, {rejectWithValue})=>{
        try {
            const res = await axiosInstance.post(`/booking/${bookingid}/accept`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Accept Booking Failed");
        }
    }
)
export const handleRejectBooking = createAsyncThunk(
    "/rejectbooking",
    async({id, reason}, {rejectWithValue})=>{
        try {
            const res = await axiosInstance.put(`/booking/${id}/reject`, { reason });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Reject Booking Failed");
        }
    }
)

export const bookingInfo = createAsyncThunk(
    "/booking",
    async(bookingid, {rejectWithValue})=>{
        try {
            const res = await axiosInstance.get(`/booking/${bookingid}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Reject Booking Failed");
        }
    }
)

export const bookingSlice = createSlice({
    name: "bookingSlice",
    initialState: {
        booking: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(showBooking.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(showBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.booking = action.payload.bookings;
            })
            .addCase(showBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(handleAcceptBooking.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }
            )
            .addCase(handleAcceptBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.booking = state.booking
                    .filter(booking => booking._id !== action.payload.booking._id)
                    .concat(action.payload.booking);
            })
            .addCase(handleAcceptBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(handleRejectBooking.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(handleRejectBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.booking = state.booking.filter(
                    booking => booking._id !== action.payload.booking._id
                );
            })
            .addCase(handleRejectBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(bookingInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(bookingInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.booking = Array.isArray(action.payload) ? action.payload : [action.payload];
            })
            .addCase(bookingInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
})

export default bookingSlice.reducer;
export const selectBooking = (state) => state.booking.booking;
