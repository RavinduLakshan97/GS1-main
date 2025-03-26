import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    sideNav?: {
      main: string;
      active?: string;
      hover?: string;
    };
  }

  interface PaletteOptions {
    sideNav?: {
      main: string;
      active?: string;
      hover?: string;
    };
  }
  interface Components {
    MuiDayCalendar?: {
      styleOverrides?: {
        root?: React.CSSProperties;
        weekDayLabel?: React.CSSProperties;
      };
    };
  }
}

export const getThemeMUI = (
  mode: "light" | "dark",
  colors: { [key: string]: string } // Allows dynamic color updates
) => {
  // Apply CSS variables globally for custom themes
  Object.entries(colors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--theme-${key}`, value);
  });

  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#146285",
      },
      secondary: {
        main: colors.secondary || "#dc004e",
      },
      error: {
        main: colors.error || "#d32f2f",
      },
      sideNav: {
        main: "#146285",
        active: "#565656",
        hover: "#a3a3a3",
      },

      background: {
        default: mode === "dark" ? "#d7e3e8" : "#d7e3e8",
        paper: mode === "dark" ? "#1e1e1e" : "#e5e5e5",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
        secondary: mode === "dark" ? "#000000" : "#ffffff",
      },

      action: {
        active: "#000",
        hover: "rgba(0, 0, 0, 0.04)",
        selected: "rgba(0, 0, 0, 0.08)",
        disabled: "rgba(0, 0, 0, 0.26)",
        disabledBackground: "rgba(0, 0, 0, 0.12)",
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
            // fontWeight: 600,
          }),
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: "gray",
            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },
            "&.Mui-error": {
              color: theme.palette.error,
            },
          }),
          shrink: ({ theme }) => ({
            color: theme.palette.primary.main,
          }),
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: ({ theme }) => ({
            color: theme.palette.primary.main,
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#000000" : "#e5e5e5",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor: theme.palette.sideNav?.main,
          }),
        },
      },
      MuiDayCalendar: {
        styleOverrides: {
          weekDayLabel: {
            color: "#146285",
            border: "1px solid #146285",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            // Select the icon inside the TextField (often an SVG inside an IconButton).
            "& .MuiIconButton-root": {
              color: "#146285",
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            // This sets the color of the unchecked state
            color: "#146285", // e.g., purple
            "&.Mui-checked": {
              // This sets the color of the checked icon
              color: "#146285",
            },
          },
        },
      },
    },
  });
};
