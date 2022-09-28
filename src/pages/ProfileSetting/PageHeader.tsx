import { useAppSelector } from "state";
import { selectProfile } from "state/profile/selectors";
import { Typography } from "@mui/material";

const PageHeader = () => {
  const profile = useAppSelector(selectProfile);

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        User Settings
      </Typography>
      <Typography variant="subtitle2">
        {profile.user.first_name} {profile.user.last_name}
      </Typography>
    </>
  );
};

export default PageHeader;
