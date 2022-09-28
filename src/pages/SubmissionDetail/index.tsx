import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { axios } from "config/axios";
import { useAppDispatch, useAppSelector } from "state";
import { selectSubmissionById } from "state/submissions/selectors";
import { ProblemStats, ProblemSubmissionStats } from "types";
import { PROBLEM_EP, SUBMISSION_EP } from "constants/endpoints";
import { getSubmissionWithToast } from "state/submissions/actions";
import {
  Box,
  Typography,
  Button,
  Divider,
  Container,
  Grid,
} from "@mui/material";
import SuspenseLoader from "components/SuspenseLoader";
import im404 from "assets/images/status/404.svg";
import { Helmet } from "react-helmet-async";
import { ProblemStatsChart } from "./ProblemStatsChart";
import { SubmissionsAnalytics } from "./SubmissionsAnalytics";
import { Detail } from "./Detail";

export const SubmissionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [isFailed, setIsFailed] = useState(false);
  const [problemStats, setProblemStats] = useState<ProblemStats | null>(null);
  const [problemSubmissionStats, setProblemSubmissionStats] =
    useState<ProblemSubmissionStats | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const submission = useAppSelector(
    selectSubmissionById(parseInt(id || "0", 10))
  );

  useEffect(() => {
    if (!submission && id) {
      const promise = getSubmissionWithToast(dispatch, {
        id: parseInt(id, 10),
      });
      promise.catch(() => setIsFailed(true));
    }
    if (submission && !problemStats) {
      axios.get(`${PROBLEM_EP}${submission.problem}/stats/`).then((res) => {
        setProblemStats(res.data);
      });
      // .catch(() => setIsFailed(true));
    }
    if (submission && !problemSubmissionStats) {
      axios
        .get(`${SUBMISSION_EP}problem/${submission.problem}/stats/`)
        .then((res) => {
          setProblemSubmissionStats(res.data);
        });
      // .catch(() => setIsFailed(true));
    }
    if (submission && !code) {
      axios
        .get<string>(submission.code, {
          baseURL: "",
        })
        .then((res) => {
          setCode(res.data);
        })
        .catch(console.info);
    }
  }, [code, dispatch, id, problemStats, problemSubmissionStats, submission]);

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

  if (!submission) {
    return <SuspenseLoader />;
  }

  return (
    <>
      <Helmet>
        <title>{`Submission ${submission.id} | Tersecode`}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Detail submission={submission} code={code || ""} />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 2,
              }}
            >
              {problemStats && (
                <ProblemStatsChart problemStats={problemStats} />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 2,
              }}
            >
              {problemSubmissionStats && (
                <SubmissionsAnalytics stats={problemSubmissionStats} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SubmissionDetail;
