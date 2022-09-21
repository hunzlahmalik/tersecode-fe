import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from "components/Footer";

import { Grid, Container } from "@mui/material";

import { useAppDispatch, useAppSelector } from "state";
import { selectProfile } from "state/profile/selectors";
import { ProfileCover } from "components/ProfileCover";
import { selectUserIsAuthenticated } from "state/user/selectors";
import { updateProfileWithToast } from "state/profile/actions";
import RecentActivity from "./RecentActivity";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const profile = useAppSelector(selectProfile);

  const handleAvatarUpload = (file: File) => {
    updateProfileWithToast(dispatch, {
      payload: { avatar: file as unknown as string },
      username: profile.user.username,
    });
  };

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
