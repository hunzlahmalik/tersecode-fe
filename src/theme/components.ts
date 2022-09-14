import { Theme } from "@mui/material";

export const getComponents = (
  { palette: { primary, secondary, grey, background } }: Theme,
  { borderRadius }: { borderRadius: number }
) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        borderRadius: "4px",
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
      rounded: {
        borderRadius: `${borderRadius}px`,
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        color: grey[900],
        padding: "24px",
      },
      title: {
        fontSize: "1.125rem",
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: "24px",
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: "24px",
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        color: grey[700],
        paddingTop: "10px",
        paddingBottom: "10px",
        "&.Mui-selected": {
          color: secondary.dark,
          backgroundColor: secondary.light,
          "&:hover": {
            backgroundColor: secondary.light,
          },
          "& .MuiListItemIcon-root": {
            color: secondary.dark,
          },
        },
        "&:hover": {
          backgroundColor: secondary.light,
          color: secondary.dark,
          "& .MuiListItemIcon-root": {
            color: secondary.dark,
          },
        },
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: grey[700],
        minWidth: "36px",
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: {
        color: grey[900],
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        color: grey[900],
        "&::placeholder": {
          color: grey[700],
          fontSize: "0.875rem",
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        background: grey[50],
        borderRadius: `${borderRadius}px`,
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: grey[400],
        },
        "&:hover $notchedOutline": {
          borderColor: primary.light,
        },
        "&.MuiInputBase-multiline": {
          padding: 1,
        },
      },
      input: {
        fontWeight: 500,
        background: grey[50],
        padding: "15.5px 14px",
        borderRadius: `${borderRadius}px`,
        "&.MuiInputBase-inputSizeSmall": {
          padding: "10px 14px",
          "&.MuiInputBase-inputAdornedStart": {
            paddingLeft: 0,
          },
        },
      },
      inputAdornedStart: {
        paddingLeft: 4,
      },
      notchedOutline: {
        borderRadius: `${borderRadius}px`,
      },
    },
  },
  MuiSlider: {
    styleOverrides: {
      root: {
        "&.Mui-disabled": {
          color: grey[300],
        },
      },
      mark: {
        backgroundColor: background.paper,
        width: "4px",
      },
      valueLabel: {
        color: primary.light,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: grey[200],
        opacity: 1,
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        color: primary.dark,
        background: primary.light,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        "&.MuiChip-deletable .MuiChip-deleteIcon": {
          color: "inherit",
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        color: background.paper,
        background: grey[700],
      },
    },
  },
});
