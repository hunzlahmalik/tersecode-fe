import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "state";
import { addSubmissions } from "state/submissions/actions";
import { fetchSubmissions } from "state/submissions/helper";
import { toast } from "react-toastify";
import { format } from "date-fns";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button,
} from "@mui/material";

import Label from "components/Label";
import {
  LaunchTwoTone,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";

import { Submission, SubmissionStatus } from "types";
import { SubmissionFilters, SubmissionFiltersProps } from "./SubmissionFilters";

const getStatusLabel = (status: SubmissionStatus): JSX.Element => {
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

const SubmissionsTable = () => {
  const dispatch = useAppDispatch();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isNextPage, setIsNextPage] = useState<boolean>(false);
  const [isPrevPage, setIsPrevPage] = useState<boolean>(false);
  const [filters, setFilters] = useState<SubmissionFiltersProps>({
    status: null,
    order: "-timestamp",
    page: 1,
  });

  const handleFilterChange = (key: string, value: string | number | null) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    console.info(filters);
    const params = new SubmissionFilters(filters).getFilterParams();
    const response = fetchSubmissions({ params });
    toast.promise(response, {
      pending: "Loading Submissions",
      error: "Error Loading Submissions",
      success: "Submissions Loaded",
    });

    response
      .then((data) => {
        if (data) {
          if (data.results) {
            setSubmissions(data.results);
            dispatch(addSubmissions(data.results));
          }
          if (data.next) {
            setIsNextPage(true);
          } else {
            setIsNextPage(false);
          }
          if (data.previous) {
            setIsPrevPage(true);
          } else {
            setIsPrevPage(false);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {};
  }, [dispatch, filters]);

  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        action={
          <Box width={300} display="flex">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || "N"}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                label="Status"
                autoWidth
              >
                {SubmissionFilters.statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.value} value={statusOption.value}>
                    {statusOption.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Divider orientation="vertical" flexItem sx={{ mr: 2, ml: 2 }} />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Order</InputLabel>
              <Select
                value={filters.order}
                onChange={(e) => handleFilterChange("order", e.target.value)}
                label="Status"
                autoWidth
              >
                {SubmissionFilters.orderOptions.map((orderOption) => (
                  <MenuItem key={orderOption.value} value={orderOption.value}>
                    {orderOption.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="Submissions"
      />
      <Divider />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>problem</TableCell>
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
                  {/* problem */}
                  <TableCell>
                    <IconButton
                      component={NavLink}
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
      <Box p={2}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            disabled={!isPrevPage}
            onClick={() => handleFilterChange("page", +filters.page - 1)}
            sx={{ mr: 2 }}
            startIcon={<NavigateBefore />}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!isNextPage}
            onClick={() => handleFilterChange("page", +filters.page + 1)}
            sx={{ mr: 2 }}
            endIcon={<NavigateNext />}
          >
            Next
          </Button>

          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            sx={{ mr: 2, pt: 1 }}
          >
            Page {filters.page}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default SubmissionsTable;
