import { createReducer } from "@reduxjs/toolkit";
import { decodeJwt, JWTPayload } from "jose";
import { login, signUp, refreshToken } from "./actions";
import { UserState } from "./types";

export const initialState: UserState = {
  id: -1,
  username: "",
  refresh: "",
  access: "",
  isLoading: false,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.access && action.payload.refresh) {
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        const decoded = decodeJwt(action.payload.access) as JWTPayload & {
          user_id: number;
          username: string;
        };
        state.id = decoded.user_id;
        state.username = decoded.username;
      } else {
        state.error = action.payload;
      }
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    .addCase(signUp.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!action.payload.id) {
        state.error = action.payload;
      }
    })
    .addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })

    .addCase(refreshToken.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(refreshToken.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.access) {
        state.access = action.payload.access;
      } else {
        state.error = action.payload;
      }
    })
    .addCase(refreshToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      // eslint-disable-next-line no-param-reassign
      state = undefined as unknown as any;
    });
});
