import { Box } from "@mui/material";
import { DayCount } from "types";
import CalendarHeatmap from "react-calendar-heatmap";
import "./Heatmap.css";

export const Heatmap = ({ data }: { data: DayCount }) => {
  const chartData = data.map((day) => ({
    date: day.day,
    count: day.count,
  }));

  return (
    <Box width="100%">
      <CalendarHeatmap
        showMonthLabels
        showWeekdayLabels
        horizontal
        values={chartData}
        startDate={new Date("2021-12-31")}
        classForValue={(value: { date: string; count: number } | null) => {
          if (!value) {
            return "color-empty";
          }
          if (value.count === 0) {
            return "color-empty";
          }
          if (value.count > 30) return "color-github-5";
          if (value.count > 20) return "color-github-4";
          if (value.count > 10) return "color-github-3";
          if (value.count > 4) return "color-github-2";
          if (value.count > 2) return "color-github-1";
          if (value.count > 0) return "color-github-0";
          return "color-empty";
        }}
        tooltipDataAttrs={(value: { date: Date; count: number } | null) => {
          if (!value || !value.date) {
            return null;
          }
          return {
            "data-tooltip": `${value.date} has count: ${value.count}`,
            "data-tip": `${value.date} has count: ${value.count}`,
          };
        }}
      />
    </Box>
  );
};
