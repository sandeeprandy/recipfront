import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserFeed, fetchUserProfile } from "../services/userService";


export const getUserFeed = createAsyncThunk("user/getUserFeed", async () => {
  return await fetchUserFeed();
});

export const getUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  return await fetchUserProfile();
});

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
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
