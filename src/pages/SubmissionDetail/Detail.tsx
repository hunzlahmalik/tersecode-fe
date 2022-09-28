import { Submission, SubmissionStatus } from "types";
import { ProblemEditor } from "pages/ProblemDetail/ProblemEditor";
import Label from "components/Label";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Card,
  Box,
  IconButton,
} from "@mui/material";
import { NavLink } from "react-router-dom";

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

const getErrorLabel = (status: "Yes" | "No"): JSX.Element => {
  if (!status) return null as unknown as any;
  return status === "No" ? (
    <Label color="success">{status}</Label>
  ) : (
    <Label color="error">{status}</Label>
  );
};

export const Detail = ({
  submission,
  code,
}: {
  submission: Submission;
  code: string;
}) => {
  const result = JSON.parse(submission.analytics?.result || "{}");
  const error = result.error || null;
  const totaltestcases = result.total || null;
  const passedtestcases = result.passed || null;
  const tableData = {
    ID: submission.id,
    Problem: (
      <IconButton
        component={NavLink}
        sx={{ m: 0, p: 0 }}
        to={`/problems/${submission.problem}`}
      >
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {submission.problem}
        </Typography>
      </IconButton>
    ),
    Status: getStatusLabel(submission.analytics?.status || "Pending"),
    Language: submission.language,
    Time: submission.timestamp,
    Runtime: submission.analytics?.runtime || "N/A",
    Error: getErrorLabel(error ? "Yes" : "No"),
    "Total Testcases": totaltestcases?.toString() || "N/A",
    "Passed Testcases": passedtestcases?.toString() || "N/A",
    code: (
      <ProblemEditor value={code} width="100%" readOnly setValue={() => {}} />
    ),
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
        }}
      >
        <TableContainer>
          <Table>
            <TableBody>
              {Object.entries(tableData).map(([key, value]) => (
                <TableRow hover key={key}>
                  {/* key */}
                  <TableCell>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {key}
                    </Typography>
                  </TableCell>
                  {/* value */}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {value}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {error && (
        <Card
          sx={{
            mt: 2,
            width: "100%",
            backgroundColor: "error.light",
          }}
        >
          <Box
            sx={{
              padding: 2,
              maxHeight: 300,
              overflow: "auto",
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Error
            </Typography>
            <Typography variant="body1" color="text.primary">
              {error}
            </Typography>
          </Box>
        </Card>
      )}
    </>
  );
};
