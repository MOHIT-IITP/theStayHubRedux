import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../lib/axiosInstance"

const initialState = {
    place: [],
    isLoading: false,
    error: null,
}

// you can also check that user is present or not 

export const addplace = createAsyncThunk(
    "/addplace",
    async(formData, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post("/addplace", formData);
            toast.success("Place Added Successfully");
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Add Place Failed");
        }
    }
)

export const showPlaces = createAsyncThunk(
    "/showplaces",
    async({rejectWithValue})=>{
        try {
            const res = await axiosInstance.get('/showplaces');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Show places Failed");
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
        .addCase(addplace.fulfilled, (state, action)=>{
            console.log(action);
            state.isLoading = false;
            state.place = action.payload;
        })
        .addCase(addplace.rejected, (state, action)=>{
            state.error= action.payload;
            state.isLoading = false;
        })
        .addCase(showPlaces.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(showPlaces.fulfilled, (state, action)=>{
            console.log(action);
            state.isLoading = false;
            state.place = action.payload;
        })
        .addCase(showPlaces.rejected, (state, action) =>{
            state.error = action.payload;
            state.isLoading = false;
        })
    }
})

export default placeSlice.reducer;
export const selectPlace = (state) => state.placeSlice.place; 
export const selectIsLoading = (state) => state.placeSlice.isLoading;



