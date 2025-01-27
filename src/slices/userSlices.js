import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserFeed , followUser , likePost } from "../services/userService";

export const getUserFeed = createAsyncThunk(
  "user/getUserFeed",
  async ({pincode, filter}) => {
   
    return await fetchUserFeed({pincode ,filter});
  }
);

export const following = createAsyncThunk(
  "user/followers",
  async ({friendId, userId, status}) => {
   
    return await followUser({friendId, userId, status});
  }
);
export const postLikes = createAsyncThunk(
  "user/whoLiked",
  async ({postId, userId, status }) => {
   
    return await likePost({postId, userId, status });
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
