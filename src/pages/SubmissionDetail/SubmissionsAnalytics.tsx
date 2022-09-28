import { Box, alpha, Typography, styled, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { ProblemSubmissionStats } from "types";

const DotPrimaryLight = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.primary.lighter};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const DotPrimary = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.primary.main};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

export const SubmissionsAnalytics = ({
  stats,
}: {
  stats: ProblemSubmissionStats;
}) => {
  const theme = useTheme();

  const dates = stats.map((result) => result.day);
  const accepted = stats.map((result) => result.accepted);
  const total = stats.map((result) => result.count);

  const chartOptions: ApexOptions = {
    chart: {
      background: "transparent",
      type: "bar",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: "35%",
      },
    },
    colors: [theme.colors.primary.main, alpha(theme.colors.primary.main, 0.5)],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    theme: {
      mode: theme.palette.mode,
    },
    stroke: {
      show: true,
      width: 3,
      colors: ["transparent"],
    },
    legend: {
      show: false,
    },
    labels: dates,
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      tickAmount: 6,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
      y: {
        formatter(val: any) {
          return `${val}`;
        },
      },
      theme: "dark",
    },
  };

  const chartData = [
    {
      name: "Accepted",
      data: accepted,
    },
    {
      name: "Total",
      data: total,
    },
  ];

  return (
    <Box width="100%">
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h3">Problem Submissions</Typography>
      </Box>
      <Box display="flex" alignItems="center" pb={2}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
          }}
        >
          <DotPrimary />
          Accepted Submissions
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <DotPrimaryLight />
          Total Submissions
        </Typography>
      </Box>
      <Chart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={270}
        width="100%"
      />
    </Box>
  );
};

export default SubmissionsAnalytics;
