import { useRoutes } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import LocalizationProvider from "@mui/x-date-pickers/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import router from "router";

import ThemeProvider from "theme/ThemeProvider";

export const App = () => {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
};
