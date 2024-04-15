import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
} from "@mui/material";

import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

export interface RecentActivityProps {
  submissions: {
    total: number;
    accepted: number;
  };
  problems: {
    total: number;
    solved: number;
  };
}

const RecentActivity = ({ submissions, problems }: RecentActivityProps) => {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Recent Activity" />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <ShoppingBagTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Submissions</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total
              </Typography>
              <Typography variant="h2">{submissions.total}</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Failed
              </Typography>
              <Typography variant="h2">{submissions.accepted}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <FavoriteTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Problems</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Attempted
              </Typography>
              <Typography variant="h2">{problems.total}</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Solved
              </Typography>
              <Typography variant="h2">{problems.solved}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default RecentActivity;
