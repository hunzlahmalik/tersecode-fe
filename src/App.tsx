import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CssBaseline } from "@mui/material";

import router from "router";
import ThemeProvider from "theme/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const content = useRoutes(router);

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
