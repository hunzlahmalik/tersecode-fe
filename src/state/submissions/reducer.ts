import { createReducer } from "@reduxjs/toolkit";
import { Submission } from "types";
import { getSubmission, getSubmissions, addSubmissions } from "./actions";
import { SubmissionsState } from "./types";

export const initialState: SubmissionsState = {
  submissions: {},
  count: 0,
  isLoading: false,
  error: null,
};

export const submissionsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getSubmission.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getSubmission.fulfilled, (state, action) => {
      state.isLoading = false;
      state.submissions[action.payload.id] = action.payload as Submission;
    })
    .addCase(getSubmission.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    })
    .addCase(getSubmissions.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getSubmissions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.count = action.payload.count;
      action.payload.results.forEach((submission) => {
        state.submissions[submission.id] = submission;
      });
    })
    .addCase(getSubmissions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    })
    .addCase(addSubmissions, (state, action) => {
      action.payload.forEach((submission) => {
        state.submissions[submission.id] = submission;
      });
    });
});
