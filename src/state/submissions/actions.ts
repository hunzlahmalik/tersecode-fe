import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "config/axios";
import { withToast } from "state/utils";
import { PROBLEM_EP, SUBMISSION_EP } from "constants/endpoints";
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

export const postSubmission = createAsyncThunk(
  "submissions/postSubmission",
  async ({
    problem,
    code,
    language,
    extension,
  }: {
    problem: number;
    code: string;
    language: number;
    extension: string;
  }): Promise<SubmissionResponse> => {
    const formData = new FormData();
    formData.append("problem", problem.toString());
    formData.append("language", language.toString());
    formData.append(
      "code",
      new Blob([code], { type: "text/plain" }),
      `code.${extension}`
    );

    const { data } = await axios.post<SubmissionResponse>(
      SUBMISSION_EP,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
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

export const postSubmissionWithToast = withToast(postSubmission, {
  pending: "Submitting...",
  success: "Code Submitted Successfully",
  error: "Code Submission failed",
});
