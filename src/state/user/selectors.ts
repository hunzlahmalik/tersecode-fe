import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "state";

export const selectUser = (state: RootState) => state.user;

export const selectUserIsLoading = createSelector(
  selectUser,
  (user) => user.isLoading
);

export const selectUserError = createSelector(selectUser, (user) => user.error);

export const selectUserIsAuthenticated = createSelector(
  selectUser,
  (user) =>
    !!user.access &&
    !!user.refresh &&
    user.access.length > 0 &&
    user.refresh.length > 0 &&
    user.id > 0
);

export const selectUserRefreshToken = createSelector(
  selectUser,
  (user) => user.refresh
);

export const selectUserAccessToken = createSelector(
  selectUser,
  (user) => user.access
);

export const selectUserId = createSelector(selectUser, (user) => user.id);

export const selectUserUsername = createSelector(
  selectUser,
  (user) => user.username
);
