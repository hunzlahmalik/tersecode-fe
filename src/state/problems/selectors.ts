import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "state";

export const selectProblems = (state: RootState) => state.problems;

export const selectProblemsCount = createSelector(
  selectProblems,
  (problems) => problems.count
);

export const selectProblemsLoading = createSelector(
  selectProblems,
  (problems) => problems.isLoading
);

export const selectProblemsError = createSelector(
  selectProblems,
  (problems) => problems.error
);

export const selectProblemsList = createSelector(selectProblems, (problems) =>
  Object.values(problems.problems)
);

export const selectProblemsMap = createSelector(
  selectProblems,
  (problems) => problems.problems
);

export const selectProblemById = (id: number) =>
  createSelector(selectProblems, (problems) => problems.problems[id]);

export const selectProblemsExist = (id: number) =>
  createSelector(selectProblems, (problems) => id in problems.problems);
