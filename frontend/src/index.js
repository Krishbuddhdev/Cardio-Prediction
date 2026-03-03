import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1f4e7a" },
    secondary: { main: "#e67e4a" },
    success: { main: "#2b7a62" },
    warning: { main: "#e67e4a" },
    error: { main: "#c44545" },
    background: { default: "#f3f7fc", paper: "#ffffff" },
    text: { primary: "#1a2b3c", secondary: "#5f7d9e" },
    divider: "#e0eaf5",
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h3: { fontWeight: 800, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { scrollBehavior: "smooth" } } },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiButton: { styleOverrides: { root: { borderRadius: 40 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 28 } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 16 } } },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
