import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../lib/axiosInstance"

const initialState = {
    place: [],
    isLoading: false,
    error: null,
}


export const addplace = createAsyncThunk(
    "/addplace",
    async(formData, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post("/addplace", formData);
            return res.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Add Place Failed");
        }
    }
)

export const placeinfo = createAsyncThunk(
    "/hotelpage",
    async(placeid, {rejectWithValue}) => {
        try {
            const res =  await axiosInstance.get(`/places/${placeid}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Getting hotel info Failed");
        }
    }
)
export const getplace = createAsyncThunk(
    "/place",
    async(_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/place');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Get all hotel info Failed");
        }
    }
)

export const placeSlice = createSlice({
    name: "placeSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addplace.pending, (state)=>{
            state.isLoading = true;
            state.error= null;
        })
        .addCase(addplace.fulfilled, (state)=>{
            state.isLoading = false;
            // state.place = action.payload;
        })
        .addCase(addplace.rejected, (state, action)=>{
            state.error= action.payload;
            state.isLoading = false;
        })
        .addCase(placeinfo.pending, (state)=>{
                state.isLoading = true;
                state.error = null;
        })
        .addCase(placeinfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.place = action.payload;
        })
        .addCase(placeinfo.rejected, (state) => {
                state.isLoading = false;
                state.error = action.payload; 
        })
        .addCase(getplace.pending, (state) => {
                state.isLoading = true;
                state.error =  false;
        })
        .addCase(getplace.fulfilled, (state, action) => {
                state.place = action.payload;
                state.isLoading = false;
                state.error = null;
        })
        .addCase(getplace.rejected, (state) => {
                state.isLoading = false;
                state.error = action.payload;
        });

    }
})


export default placeSlice.reducer;
export const selectPlace = (state) => state.place; 
export const selectIsLoading = (state) => state.place.isLoading;



