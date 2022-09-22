import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "config/axios";
import { withToast } from "state/utils";
import { PROBLEM_EP } from "constants/endpoints";
import { Submission } from "types";
import { fetchSubmissions } from "./helper";
import { SubmissionResponse } from "./types";

export const getSubmission = createAsyncThunk(
  "submissions/getSubmission",
  async ({ id }: { id: number }) => {
    const { data } = await axios.get<SubmissionResponse>(`${PROBLEM_EP}${id}/`);
    return data as Submission;
  }
);

export const getSubmissions = createAsyncThunk(
  "submissions/getSubmissions",
  fetchSubmissions
);

export const addSubmissions = createAction<Submission[]>(
  "submissions/addSubmissions"
);

export const getSubmissionWithToast = withToast(getSubmission, {
  pending: "Loading submission...",
  success: "Submission fetched successfully",
  error: "Submission fetch failed",
});

export const getSubmissionsWithToast = withToast(getSubmissions, {
  pending: "Loading submissions...",
  success: "Submissions fetched successfully",
  error: "Submissions fetch failed",
});
