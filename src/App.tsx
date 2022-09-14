import {
  ThemeProvider,
  CssBaseline,
  StyledEngineProvider,
} from "@mui/material";

import theme from "theme";

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>Hello World</div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
