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
        // eslint-disable-next-line no-param-reassign
        state = { ...state, ...action.payload };
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
        // eslint-disable-next-line no-param-reassign
        state = { ...state, ...action.payload };
      } else {
        state.error = action.payload;
      }
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
});
