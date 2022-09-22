import { ErrorResponse, Submission } from "types";

export interface SubmissionsState {
  submissions: {
    [id: Submission["id"]]: Submission;
  };
  count: number;
  isLoading: boolean;
  error: string | null | ErrorResponse;
}

export interface SubmissionsResponse extends ErrorResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Submission[];
}

export interface SubmissionResponse extends Submission, ErrorResponse {}
