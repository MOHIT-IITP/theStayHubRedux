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
        });
    }
})

export default placeSlice.reducer;
export const selectPlace = (state) => state.placeSlice; 
export const selectIsLoading = (state) => state.placeSlice.isLoading;



