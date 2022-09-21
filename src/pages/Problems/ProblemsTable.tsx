import { useEffect, useState } from "react";
import { useAppDispatch } from "state";
import { addProblems } from "state/problems/actions";
import { fetchProblems } from "state/problems/helper";
import { toast } from "react-toastify";
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
  NavigateBefore,
  NavigateNext,
  TerminalTwoTone,
} from "@mui/icons-material";

import { Difficulty, Problem, ProblemStatus } from "types";
import { ProblemFilters, ProblemFiltersProps } from "./ProblemFilters";

const getStatusLabel = (status: ProblemStatus): JSX.Element => {
  const map = {
    Failed: {
      text: "Failed",
      color: "error",
    },
    Completed: {
      text: "Completed",
      color: "success",
    },
    "Not Attempted": {
      text: "Pending",
      color: "warning",
    },
  };

  const { text, color }: any = map[status];

  return <Label color={color}>{text}</Label>;
};

const getDifficultyLabel = (difficulty: Difficulty): JSX.Element => {
  const map = {
    E: {
      text: "Easy",
      color: "success",
    },
    M: {
      text: "Medium",
      color: "warning",
    },
    H: {
      text: "Hard",
      color: "error",
    },
  };

  const { text, color }: any = map[difficulty];

  return <Label color={color}>{text}</Label>;
};

const ProblemsTable = () => {
  const dispatch = useAppDispatch();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isNextPage, setIsNextPage] = useState<boolean>(false);
  const [isPrevPage, setIsPrevPage] = useState<boolean>(false);
  const [filters, setFilters] = useState<ProblemFiltersProps>({
    difficulty: null,
    order: "id",
    search: null,
    page: 1,
  });

  const handleFilterChange = (key: string, value: string | number | null) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    console.info(filters);
    const params = new ProblemFilters(filters).getFilterParams();
    const response = fetchProblems({ params });
    toast.promise(response, {
      pending: "Loading Problems",
      error: "Error Loading Problems",
      success: "Problems Loaded",
    });

    response
      .then((data) => {
        if (data) {
          if (data.results) {
            setProblems(data.results);
            dispatch(addProblems(data.results));
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
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={filters.difficulty || "A"}
                onChange={(e) =>
                  handleFilterChange("difficulty", e.target.value)
                }
                label="Status"
                autoWidth
              >
                {ProblemFilters.difficultyOptions.map((difficultyOption) => (
                  <MenuItem
                    key={difficultyOption.value}
                    value={difficultyOption.value}
                  >
                    {difficultyOption.label}
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
                {ProblemFilters.orderOptions.map((orderOption) => (
                  <MenuItem key={orderOption.value} value={orderOption.value}>
                    {orderOption.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="Problems"
      />
      <Divider />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>title</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell align="right">Difficulty</TableCell>
              <TableCell align="right">Solution</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem) => {
              return (
                <TableRow hover key={problem.id}>
                  {/* id */}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {problem.id}
                    </Typography>
                  </TableCell>
                  {/* title */}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {problem.title}
                    </Typography>
                  </TableCell>
                  {/* tags */}
                  <TableCell>
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                      {problem.tags.slice(0, 3).map((tag) => (
                        <Label key={tag} color="primary">
                          {tag}
                        </Label>
                      ))}
                    </Box>
                  </TableCell>
                  {/* difficulty */}
                  <TableCell align="right">
                    {/* <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {problem.difficulty}
                    </Typography> */}
                    {getDifficultyLabel(problem.difficulty)}
                  </TableCell>
                  {/* solution */}
                  <TableCell align="right">
                    {problem.solution ? (
                      <Label color="success">Available</Label>
                    ) : (
                      <Label color="warning">Not Available</Label>
                    )}
                  </TableCell>
                  {/* status */}
                  <TableCell align="right">
                    {problem.status ? (
                      getStatusLabel(problem.status)
                    ) : (
                      <Label color="warning">Not Available</Label>
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Solve Problem" arrow>
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
                        <TerminalTwoTone fontSize="large" />
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

export default ProblemsTable;
