import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "components/Footer";
import { axios } from "config/axios";
import { Grid, Container } from "@mui/material";

import { useAppDispatch, useAppSelector } from "state";
import { selectProfile } from "state/profile/selectors";
import { ProfileCover } from "components/ProfileCover";
import { updateProfileWithToast } from "state/profile/actions";
import { DayCount } from "types";
import { PROBLEM_EP, SUBMISSION_EP } from "constants/endpoints";
import RecentActivity, { RecentActivityProps } from "./RecentActivity";
import { Heatmap } from "./Heatmap";

const Profile = () => {
  const dispatch = useAppDispatch();
  const [dayCount, setDayCount] = useState<DayCount | null>(null);
  const [submissions, setSubmissions] = useState<
    RecentActivityProps["submissions"] | null
  >(null);
  const [problems, setProblems] = useState<
    RecentActivityProps["problems"] | null
  >(null);

  const profile = useAppSelector(selectProfile);

  const handleAvatarUpload = (file: File) => {
    updateProfileWithToast(dispatch, {
      payload: { avatar: file as unknown as string },
      username: profile.user.username,
    });
  };

  useEffect(() => {
    if (profile && !dayCount) {
      axios.get<DayCount>(`${SUBMISSION_EP}daycount/`).then((res) => {
        setDayCount(res.data);
      });
    }
    if (profile && !submissions) {
      axios
        .get<RecentActivityProps["submissions"]>(`${SUBMISSION_EP}userstats/`)
        .then((res) => {
          setSubmissions(res.data);
        });
    }
    if (profile && !problems) {
      axios
        .get<RecentActivityProps["problems"]>(`${PROBLEM_EP}userstats/`)
        .then((res) => {
          setProblems(res.data);
        });
    }
  }, [dayCount, problems, profile, submissions]);

  return (
    <>
      <Helmet>
        <title>User Details</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover
              handleAvatarUpload={handleAvatarUpload}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...profile}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {submissions && problems && (
              <RecentActivity submissions={submissions} problems={problems} />
            )}
          </Grid>
          <Grid item xs={12}>
            {dayCount && <Heatmap data={dayCount} />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
