import { ErrorResponse, Problem } from "types";

export interface ProblemsState {
  problems: {
    [id: Problem["id"]]: Problem;
  };
  count: number;
  isLoading: boolean;
  error: string | null | ErrorResponse;
}

export interface ProblemsResponse extends ErrorResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Problem[];
}

export interface ProblemResponse extends Problem, ErrorResponse {}
