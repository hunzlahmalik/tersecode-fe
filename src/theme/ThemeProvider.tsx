import React, { ReactNode, useCallback, useState } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { themeCreator } from "./base";

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const curThemeName = localStorage.getItem("appTheme") || "NebulaFighterTheme";
  const [themeName, setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);

  const setThemeNameWrapper = useCallback((_themeName: string) => {
    localStorage.setItem("appTheme", _themeName);
    setThemeName(_themeName);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={setThemeNameWrapper}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
