import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "state";

export const selectSubmissions = (state: RootState) => state.submissions;

export const selectSubmissionsCount = createSelector(
  selectSubmissions,
  (submissions) => submissions.count
);

export const selectSubmissionsLoading = createSelector(
  selectSubmissions,
  (submissions) => submissions.isLoading
);

export const selectSubmissionsError = createSelector(
  selectSubmissions,
  (submissions) => submissions.error
);

export const selectSubmissionsList = createSelector(
  selectSubmissions,
  (submissions) => Object.values(submissions.submissions)
);

export const selectSubmissionsMap = createSelector(
  selectSubmissions,
  (submissions) => submissions.submissions
);

export const selectSubmissionById = (id: number) =>
  createSelector(
    selectSubmissions,
    (submissions) => submissions.submissions[id]
  );

export const selectSubmissionsExist = (id: number) =>
  createSelector(
    selectSubmissions,
    (submissions) => id in submissions.submissions
  );
