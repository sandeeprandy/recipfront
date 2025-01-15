import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserFeed } from "../services/userService";

export const getUserFeed = createAsyncThunk(
  "user/getUserFeed",
  async ({pincode, filter}) => {
    console.log("Filter:", filter);
    console.log("Filter:", pincode);
    return await fetchUserFeed({pincode ,filter});
  }
);



const userSlice = createSlice({
  name: "user",
  initialState: {
    feed: [],
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Feed Fetch
      .addCase(getUserFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(getUserFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Profile Fetch
    
  },
});

export default userSlice.reducer;
