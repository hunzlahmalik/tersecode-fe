import { createReducer } from "@reduxjs/toolkit";
import { getProfile, updateProfile } from "./actions";
import { ProfileState } from "./types";

export const initialState: ProfileState = {
  id: -1,
  bio: "",
  avatar: "",
  github: "",
  linkedin: "",
  country: "",
  user: null as unknown as any,
  error: null,
  isLoading: false,
};

export const profileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.id) {
        state.id = action.payload.id;
        state.bio = action.payload.bio;
        state.avatar = action.payload.avatar;
        state.github = action.payload.github;
        state.linkedin = action.payload.linkedin;
        state.country = action.payload.country;
        state.user = action.payload.user;
      } else {
        state.error = action.payload;
      }
    })
    .addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    .addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.id) {
        state.id = action.payload.id;
        state.bio = action.payload.bio;
        state.avatar = action.payload.avatar;
        state.github = action.payload.github;
        state.linkedin = action.payload.linkedin;
        state.country = action.payload.country;
      } else {
        state.error = action.payload;
      }
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
});
