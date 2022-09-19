import { Profile, ErrorResponse } from "types";

export type ProfileState = Profile & {
  isLoading: boolean;
  error: Partial<ErrorResponse | ProfileAPIResponse> | null;
};

export type ProfileAPIResponse = Profile & ErrorResponse;
