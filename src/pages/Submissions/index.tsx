import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "components/PageTitleWrapper";
import { Grid, Container, Card } from "@mui/material";
import Footer from "components/Footer";
import PageHeader from "./PageHeader";
import SubmissionsTable from "./SubmissionsTable";

const Submissions = () => {
  return (
    <>
      <Helmet>
        <title>Submissions - Tersecode</title>
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
            <Card>
              <SubmissionsTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Submissions;
