import { createReducer } from "@reduxjs/toolkit";
import { Problem } from "types";
import {
  getProblem,
  getProblems,
  postProblemDiscussion,
  addProblems,
} from "./actions";
import { ProblemsState } from "./types";

export const initialState: ProblemsState = {
  problems: {},
  count: 0,
  isLoading: false,
  error: null,
};

export const problemsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProblem.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getProblem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.problems[action.payload.id] = action.payload as Problem;
    })
    .addCase(getProblem.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    })
    .addCase(getProblems.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getProblems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.count = action.payload.count;
      action.payload.results.forEach((problem) => {
        state.problems[problem.id] = problem;
      });
    })
    .addCase(getProblems.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    })
    .addCase(postProblemDiscussion.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(postProblemDiscussion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.problems[action.payload.problem].discussion.push(action.payload);
    })
    .addCase(postProblemDiscussion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    })
    .addCase(addProblems, (state, action) => {
      action.payload.forEach((problem) => {
        state.problems[problem.id] = problem;
      });
    });
});
