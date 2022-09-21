import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "config/axios";
import { withToast } from "state/utils";
import { PROBLEM_EP } from "constants/endpoints";
import { Problem } from "types";
import { fetchProblems } from "./helper";
import { ProblemResponse } from "./types";

export const getProblem = createAsyncThunk(
  "problems/getProblem",
  async ({ id }: { id: number }) => {
    const { data } = await axios.get<ProblemResponse>(`${PROBLEM_EP}${id}/`);
    return data as Problem;
  }
);

export const getProblems = createAsyncThunk(
  "problems/getProblems",
  fetchProblems
);

export const addProblems = createAction<Problem[]>("problems/addProblems");

export const getProblemWithToast = withToast(getProblem, {
  pending: "Loading problem...",
  success: "Problem fetched successfully",
  error: "Problem fetch failed",
});

export const getProblemsWithToast = withToast(getProblems, {
  pending: "Loading problems...",
  success: "Problems fetched successfully",
  error: "Problems fetch failed",
});
