import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "state";

export const selectProfile = (state: RootState) => state.profile;

export const selectProfileIsLoading = createSelector(
  selectProfile,
  (profile) => profile.isLoading
);

export const selectProfileError = createSelector(
  selectProfile,
  (profile) => profile.error
);

export const selectProfileId = createSelector(
  selectProfile,
  (profile) => profile.id
);

export const selectProfileUsername = createSelector(
  selectProfile,
  (profile) => profile.user.username
);
