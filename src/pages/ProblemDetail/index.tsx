import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "state";
import { Navigate, useParams } from "react-router-dom";
import { getProblemWithToast } from "state/problems/actions";
import { selectProblemById } from "state/problems/selectors";
import { fetchSolution, fetchStatement } from "state/problems/helper";
import { addSubmissions } from "state/submissions/actions";
import { fetchAllSubmissions } from "state/submissions/helper";
import { toast } from "react-toastify";
import {
  Grid,
  Container,
  Box,
  Tab,
  CircularProgress,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import {
  EmojiObjectsTwoTone,
  LockTwoTone,
  ForumTwoTone,
  AccessTimeTwoTone,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel, TabPanelProps } from "@mui/lab";
import SuspenseLoader from "components/SuspenseLoader";
import im404 from "assets/images/status/404.svg";
import { Submission } from "types";
import { ProblemEditor } from "./ProblemEditor";
import { ProblemStatement } from "./ProblemStatement";
import { ProblemSolution } from "./ProblemSolution";
import { ProblemSubmissions } from "./ProblemSubmissions";

const CustomTabPanel = ({ children, ...props }: TabPanelProps) => {
  return (
    <TabPanel
      sx={{
        padding: 1,
        paddingTop: 3,
        maxHeight: "80vh",
        overflow: "scroll",
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </TabPanel>
  );
};

const STATEMENT_TAB = "1";
const SOLUTION_TAB = "2";
const DISCUSSION_TAB = "3";
const SUBMISSION_TAB = "4";

const Problems = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState(STATEMENT_TAB);
  const [code, setCode] = useState("");
  const [statement, setStatement] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isFailed, setIsFailed] = useState(false);

  const problem = useAppSelector(selectProblemById(parseInt(id || "0", 10)));

  useEffect(() => {
    if (!problem && id) {
      const promise = getProblemWithToast(dispatch, { id: parseInt(id, 10) });
      promise.catch(() => setIsFailed(true));
    }
    if (problem && !statement) {
      fetchStatement({ link: problem.statement }).then((res) =>
        setStatement(res)
      );
    }
    if (problem && problem.solution && !solution) {
      fetchSolution({ link: problem.solution.solution }).then((res) =>
        setSolution(res)
      );
    }
  }, [dispatch, id, problem, solution, statement]);

  // useEffect for previous submissions
  useEffect(() => {
    if (problem && tab === SUBMISSION_TAB) {
      const promise = fetchAllSubmissions({ params: { problem: problem.id } });
      toast.promise(promise, {
        pending: "Loading Submissions",
        error: "Error Loading Submissions",
        success: "Submissions Loaded",
      });

      promise
        .then((data) => {
          setSubmissions(data);
          dispatch(addSubmissions(data));
        })
        .catch(() => setIsFailed(true));
    }
    return () => {};
  }, [dispatch, problem, tab]);

  if (isFailed) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Box textAlign="center">
          <img alt="404" height={180} src={im404} />
          <Typography variant="h2" sx={{ my: 2 }}>
            We are sorry, but the page you are looking for was not found.
          </Typography>
        </Box>

        <Button href="/problems" variant="outlined">
          See All Problems
        </Button>
        <Divider sx={{ my: 4 }}>OR</Divider>
        <Button href="/overview" variant="outlined">
          Go to homepage
        </Button>
      </Box>
    );
  }

  if (!id) {
    return <Navigate to="/" />;
  }

  if (!problem) {
    return <SuspenseLoader />;
  }

  return (
    <>
      <Helmet>
        <title>Problem - {problem.title} - Tersecode</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
          mt={1}
          maxHeight="100vh"
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tab}>
                <Box sx={{ borderBottom: 0, overflow: "auto" }}>
                  <TabList
                    onChange={(e, v) => {
                      setTab(v);
                    }}
                    aria-label="lab API tabs example"
                    scrollButtons="auto"
                    variant="scrollable"
                  >
                    <Tab label="Statement" value={STATEMENT_TAB} />
                    <Tab
                      icon={
                        problem.solution != null ? (
                          <EmojiObjectsTwoTone />
                        ) : (
                          <LockTwoTone />
                        )
                      }
                      iconPosition="start"
                      label="Solution"
                      value={SOLUTION_TAB}
                      disabled={problem.solution == null}
                    />
                    <Tab
                      icon={<ForumTwoTone />}
                      iconPosition="start"
                      label="Discussion"
                      value={DISCUSSION_TAB}
                    />
                    <Tab
                      icon={<AccessTimeTwoTone />}
                      iconPosition="start"
                      label="Submissions"
                      value={SUBMISSION_TAB}
                    />
                  </TabList>
                </Box>
                <CustomTabPanel value={STATEMENT_TAB}>
                  {statement ? (
                    <ProblemStatement statement={statement} />
                  ) : (
                    <CircularProgress color="inherit" />
                  )}
                </CustomTabPanel>
                <CustomTabPanel value={SOLUTION_TAB}>
                  {solution ? (
                    <ProblemSolution statement={solution} />
                  ) : (
                    <CircularProgress color="inherit" />
                  )}
                </CustomTabPanel>
                <CustomTabPanel value={DISCUSSION_TAB}>
                  Item Three
                </CustomTabPanel>
                <CustomTabPanel value={SUBMISSION_TAB}>
                  <ProblemSubmissions submissions={submissions} />
                </CustomTabPanel>
              </TabContext>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ overflow: "scroll", width: "100%", maxHeight: "85vh" }}>
              <ProblemEditor value={code} setValue={setCode} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Problems;
