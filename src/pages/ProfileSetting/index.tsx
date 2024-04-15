import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import Footer from "components/Footer";

import PageHeader from "./PageHeader";

import EditProfile from "./EditProfile";

const ProfileSettings = () => {
  return (
    <>
      <Helmet>
        <title>User Settings - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <EditProfile />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ProfileSettings;
