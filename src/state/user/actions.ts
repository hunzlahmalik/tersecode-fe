import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axios } from "config/axios";
import { LOGIN_EP, SIGNUP_EP, TOK_REFRESH_EP } from "constants/endpoints";
import { ToastContentProps } from "react-toastify";
import { withToast } from "state/utils";
import {
  LoginAPIResponse,
  SignUpActionProps,
  SignUpAPIResponse,
  TokenRefreshResponse,
  LoginActionProps,
} from "./types";

export const login = createAsyncThunk(
  "user/login",
  async (payload: LoginActionProps): Promise<Partial<LoginAPIResponse>> => {
    const { data } = await axios.post(LOGIN_EP, payload);
    return data;
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (payload: SignUpActionProps): Promise<Partial<SignUpAPIResponse>> => {
    const { data } = await axios.post(SIGNUP_EP, payload);
    return data;
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (payload: {
    refresh: string;
  }): Promise<Partial<TokenRefreshResponse>> => {
    const { data } = await axios.post(TOK_REFRESH_EP, payload);
    return data;
  }
);

// with Toast
export const loginWithToast = withToast(login, {
  pending: "Logging in...",
  error: {
    render: ({
      data: error,
    }: ToastContentProps<AxiosError<Partial<LoginAPIResponse>>>) => {
      if (error) {
        if (error.response?.data?.password || error.response?.data?.email)
          return "Invalid email or password";
        if (error.message) return error.message;
        if (error.code) return error.code;
      }
      return "Something went wrong!";
    },
  },
  success: "Logged in successfully",
});

export const signUpWithToast = withToast(signUp, {
  pending: "Signing up...",
  error: {
    render: ({
      data: error,
    }: ToastContentProps<AxiosError<Partial<SignUpAPIResponse>>>) => {
      if (error) {
        if (error.response?.data?.email) return error.response?.data?.email;
        if (error.response?.data?.password)
          return error.response?.data?.password;
        if (error.message) return error.message;
        if (error.code) return error.code;
      }
      return "Something went wrong!";
    },
  },
  success: "Signed up successfully",
});

export const refreshTokenWithToast = withToast(refreshToken, {
  pending: "Refreshing token...",
  error: {
    render: (error: any) => {
      return "Something went wrong";
    },
  },
  success: "Token refreshed successfully",
});
