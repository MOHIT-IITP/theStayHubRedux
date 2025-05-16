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
            toast.success("Place Added Successfully");
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Add Place Failed");
        }
    }
)

export const showPlaces = createAsyncThunk(
    "/user",
    async(_, {rejectWithValue})=>{
        try {
            const res = await axiosInstance.get('/showplaces');
            console.log(res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Show places Failed");
        }
    }
)

export const deletePlace = createAsyncThunk(
    "/deleteplace",
    async(placeid, {rejectWithValue}) => {
        try {
            await axiosInstance.post(`/deleteplace/${placeid}`)
            toast.success("Hotel Deleted Successfully")
            return placeid;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete Failed");
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
            state.isLoading = false;
            // done this because i have to populate the existing user with place detail
            console.log("this is action payload from auth slice",action.payload);
            state.placeSlice = action.payload;
        })
        .addCase(showPlaces.rejected, (state, action) =>{
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(deletePlace.fulfilled, (state, action)=>{
                // here we are removing the place from the user redux 
                state.place.places.places = state.user.places.places.filter(
                    (place) => place._id !== action.payload
                );
        });
    }
})

export default placeSlice.reducer;
export const selectPlace = (state) => state.placeSlice; 
export const selectIsLoading = (state) => state.placeSlice.isLoading;



