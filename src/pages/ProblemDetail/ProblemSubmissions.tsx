import { LaunchTwoTone } from "@mui/icons-material";
import { format } from "date-fns";
import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Tooltip,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Label from "components/Label";
import { Submission, SubmissionStatus } from "types";

export interface ProblemSubmissionsProps {
  submissions: Submission[];
}

const getStatusLabel = (status: SubmissionStatus): JSX.Element => {
  if (!status) return null as unknown as any;
  const map: Record<SubmissionStatus, { color: string }> = {
    Accepted: {
      color: "success",
    },
    "Wrong Answer": {
      color: "error",
    },
    "Time Limit Exceeded": {
      color: "error",
    },
    "Memory Limit Exceeded": {
      color: "error",
    },
    "Runtime Error": {
      color: "error",
    },
    "Compilation Error": {
      color: "error",
    },
    Running: {
      color: "warning",
    },
    Pending: {
      color: "warning",
    },
    "Output Limit Exceeded": {
      color: "error",
    },
  };

  const { color }: any = map[status];

  return <Label color={color}>{status}</Label>;
};

export const ProblemSubmissions = ({
  submissions,
}: ProblemSubmissionsProps) => {
  const theme = useTheme();

  return (
    <Card>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Analytics</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => {
              return (
                <TableRow hover key={submission.id}>
                  {/* id */}
                  <TableCell>
                    <IconButton
                      component={NavLink}
                      to={`/submissions/${submission.id}`}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {submission.id}
                      </Typography>
                    </IconButton>
                  </TableCell>
                  {/* status */}
                  <TableCell align="right">
                    {getStatusLabel(
                      submission.analytics && submission.analytics.status
                        ? submission.analytics.status
                        : "Pending"
                    )}
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(
                        new Date(submission.timestamp),
                        "dd MMM yyyy hh:mm a"
                      )}
                    </Typography>
                  </TableCell>
                  {/* analytics */}
                  <TableCell align="right">
                    {submission.analytics ? (
                      <Label color="success">Available</Label>
                    ) : (
                      <Label color="warning">Not Available</Label>
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Details" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        component={NavLink}
                        to={`/submissions/${submission.id}`}
                      >
                        <LaunchTwoTone fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
