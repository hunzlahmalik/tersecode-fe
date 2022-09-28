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
import { SUBMISSION_EP } from "constants/endpoints";
import RecentActivity from "./RecentActivity";
import { Heatmap } from "./Heatmap";

const Profile = () => {
  const dispatch = useAppDispatch();
  const [dayCount, setDayCount] = useState<DayCount | null>(null);

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
  }, [dayCount, profile]);

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
            <RecentActivity />
          </Grid>
          <Grid item xs={12}>
            {dayCount && <Heatmap data={dayCount} />}
          </Grid>
          {/* <Grid item xs={12} md={8}>
            <Feed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
