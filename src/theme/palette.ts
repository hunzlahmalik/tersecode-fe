import { PaletteMode, PaletteOptions } from "@mui/material";
import { lightColors, darkColors } from "./colors";

export const getPalette = (mode: PaletteMode): PaletteOptions => ({
  ...(mode === "light" ? lightColors : darkColors),
  mode,
});
