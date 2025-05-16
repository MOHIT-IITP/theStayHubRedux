import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      toast.success("Login successfully");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  },
);

export const signup = createAsyncThunk(
  "/auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      toast.success("Signup successfully");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
export const logoutThunk = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logout successfully");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const checkAuth = createAsyncThunk(
  "/auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("auth check res: ", res.data);
      return res.data || res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Authentication check failed",
      );
    }
  },
);

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


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.user = null;
      })
        .addCase(showPlaces.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(showPlaces.fulfilled, (state, action)=>{
            state.isLoading = false;
            // done this because i have to populate the existing user with place detail
            console.log("this is action payload from auth slice",action.payload);
            state.user.places = action.payload;
        })
        .addCase(showPlaces.rejected, (state, action) =>{
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(deletePlace.fulfilled, (state, action)=>{
                // here we are removing the place from the user redux 
                state.user.places.places = state.user.places.places.filter(
                    (place) => place._id !== action.payload
                );
            })
  },
});

export const { logout: logoutAction } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
