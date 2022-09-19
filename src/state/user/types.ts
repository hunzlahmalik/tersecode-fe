import { SerializedError } from "@reduxjs/toolkit";
import { ErrorResponse } from "types";

export interface UserState {
  id: number;
  username: string;
  refresh: string;
  access: string;
  isLoading: boolean;
  error: Partial<
    | ErrorResponse
    | LoginAPIResponse
    | SignUpAPIResponse
    | SignUpAPIResponse
    | SerializedError
  > | null;
}

export interface LoginAPIResponse extends ErrorResponse {
  refresh: string;
  access: string;
  // in error responses
  password: string[];
  email: string[];
}

export interface SignUpAPIResponse extends ErrorResponse {
  id: number;
  // in error responses
  password: string[];
  email: string[];
  username: string[];
}

export interface TokenRefreshResponse extends ErrorResponse {
  access: string;
}
