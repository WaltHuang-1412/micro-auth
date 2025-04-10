// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// 自訂主題（可選）
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // MUI 預設藍色
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* 加上這個會讓全站樣式更一致 */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
