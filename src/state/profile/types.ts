import { Profile, ErrorResponse } from "types";

export interface ProfileState extends Profile {
  isLoading: boolean;
  error: Partial<ErrorResponse | ProfileAPIResponse> | null;
}

export type ProfileAPIResponse = Profile & ErrorResponse;
