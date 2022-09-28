import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { alpha, Box, Typography, useTheme } from "@mui/material";
import { ProblemStats } from "types";

export const ProblemStatsChart = ({
  problemStats,
}: {
  problemStats: ProblemStats;
}) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: "transparent",
      type: "pie",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    labels: ["Accepted", "Failed"],
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },
    colors: [theme.colors.primary.main, alpha(theme.colors.error.light, 0.5)],
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartData = problemStats[0];

  return (
    <>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h3">Problem Stats</Typography>
      </Box>
      <Chart
        options={chartOptions}
        series={[chartData.accepted, chartData.total - chartData.accepted]}
        type="pie"
        height={300}
      />
    </>
  );
};
