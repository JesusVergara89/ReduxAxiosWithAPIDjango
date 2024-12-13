import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://127.0.0.1:8000/api/patients/";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPost", async () => {
  const response = await axios.get(URL);
  return response.data;
});

export const requestSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.status = "success";
      })
      .addCase(fetchPosts.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message;
      });
  }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export default requestSlice.reducer;
