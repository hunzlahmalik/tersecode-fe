import { createTheme } from "@mui/material";
import { getComponents } from "./components";
import { getPalette } from "./palette";

const theme = createTheme({
  direction: "ltr",
  palette: getPalette("dark"),
  mixins: {
    toolbar: {
      minHeight: "48px",
      padding: "16px",
      "@media (min-width: 600px)": {
        minHeight: "48px",
      },
    },
  },
});

theme.components = getComponents(theme, {
  borderRadius: 4,
});

export default theme;
