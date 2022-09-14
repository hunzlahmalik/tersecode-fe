import { PaletteOptions, PaletteColorOptions } from "@mui/material";

export const common: PaletteOptions["common"] = {
  black: "#111936",
};

export const background: PaletteOptions["background"] = {
  paper: "#ffffff",
  default: "#f5f5f5",
};

export const primary: PaletteOptions["primary"] = {
  light: "#e3f2fd",
  main: "#2196f3",
  dark: "#1e88e5",
  200: "#90caf9",
  800: "#1565c0",
};

export const secondary: PaletteOptions["secondary"] = {
  light: "#ede7f6",
  main: "#673ab7",
  dark: "#5e35b1",
  200: "#b39ddb",
  800: "#4527a0",
};

export const success: PaletteOptions["success"] = {
  light: "#b9f6ca",
  main: "#00e676",
  dark: "#00c853",
  200: "#69f0ae",
};

export const error: PaletteOptions["error"] = {
  light: "#ef9a9a",
  main: "#f44336",
  dark: "#c62828",
};

export const warning: PaletteOptions["warning"] = {
  light: "#fbe9e7",
  main: "#ffab91",
  dark: "#d84315",
};

export const grey: PaletteOptions["grey"] = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  500: "#8492c4",
  600: "#212121",
  700: "#bdc8f0",
  900: "#212121",
};

export const text: PaletteOptions["text"] & {
  dark?: string;
  hint?: string;
} = {
  primary: "#bdc8f0",
  secondary: "#8492c4",
  disabled: "#bdc8f0",
  dark: grey[900],
  hint: grey[100],
};

export const orange: PaletteColorOptions = {
  light: "#fbe9e7",
  main: "#ffab91",
  dark: "#d84315",
};

export const dark: PaletteColorOptions = {
  light: text.primary,
  main: "#29314f",
  dark: "#212946",
  800: "#1a223f",
  900: "#111936",
};

export const lightColors: PaletteOptions & {
  orange?: PaletteColorOptions;
  dark?: PaletteColorOptions;
} = {
  mode: "light",
  common,
  background,
  primary,
  secondary,
  success,
  error,
  warning,
  grey,
  text,
  orange,
  dark,
};
