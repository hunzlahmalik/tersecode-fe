import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axios } from "config/axios";
import { PROFILE_EP } from "constants/endpoints";
import { ToastContentProps } from "react-toastify";
import { withToast } from "state/utils";
import { ProfileAPIResponse, ProfileState } from "./types";

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (payload: { username: string }): Promise<ProfileAPIResponse> => {
    const { data } = await axios.get(`${PROFILE_EP}${payload.username}/`);
    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({
    username,
    payload,
  }: {
    payload: Partial<ProfileState> | FormData;
    username: string;
  }): Promise<ProfileAPIResponse> => {
    console.error(payload);
    const { data } = await axios.put(`${PROFILE_EP}${username}/`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }
);

// with Toast
export const getProfileWithToast = withToast(getProfile, {
  pending: "Fetching Profile Data",
  error: {
    render: ({
      data: error,
    }: ToastContentProps<AxiosError<ProfileAPIResponse>>) => {
      if (error) {
        if (error.response) {
          if (error.response.data) {
            return JSON.stringify(error.response.data);
          }
        }
        if (error && error.message) return error.message;
        if (error.code) return error.code;
      }
      return "Something went wrong";
    },
  },
  success: "Fetch Success",
});

export const updateProfileWithToast = withToast(updateProfile, {
  pending: "Updating Profile Data",
  error: {
    render: ({
      data: error,
    }: ToastContentProps<AxiosError<ProfileAPIResponse>>) => {
      if (error) {
        console.error(error);
        if (error.response) {
          if (error.response.data) {
            return JSON.stringify(error.response.data);
          }
        }
        if (error.message) return error.message;
        if (error.code) return error.code;
      }
      return "Something went wrong";
    },
  },
  success: "Profile Updated",
});
