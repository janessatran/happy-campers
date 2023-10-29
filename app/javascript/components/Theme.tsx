import { ThemeOptions, createTheme } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#003107",
    },
    secondary: {
      main: "#ffc107",
    },
    success: {
      main: "#66bb6a",
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: "Lato",
    h1: {
      fontFamily: "Lato",
    },
    h2: {
      fontFamily: "Montserrat",
    },
    h4: {
      fontFamily: "Caveat",
    },
    body1: {
      fontFamily: "Open Sans",
    },
  },
};

export const customTheme = createTheme(themeOptions);
