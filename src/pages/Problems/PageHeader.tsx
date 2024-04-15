import { Typography, Grid } from "@mui/material";

const PageHeader = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Problems
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
