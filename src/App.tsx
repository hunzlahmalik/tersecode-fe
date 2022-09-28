import { BrowserRouter, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "theme/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { AppRoutes } from "router";

import "react-toastify/dist/ReactToastify.css";

const AppMiddleware = () => {
  const content = useRoutes(AppRoutes());

  return (
    <ThemeProvider>
      <CssBaseline />
      {content}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ThemeProvider>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppMiddleware />
    </BrowserRouter>
  );
};
