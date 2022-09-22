import { useEffect } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { SidebarProvider } from "contexts/SidebarContext";
import { ToastContainer } from "react-toastify";
import { useAppSelector, useAppDispatch } from "state";
import { getProfile } from "state/profile/actions";
import {
  selectUserUsername,
  selectUserIsAuthenticated,
} from "state/user/selectors";
import { selectProfile } from "state/profile/selectors";
import ThemeProvider from "theme/ThemeProvider";
import { CssBaseline } from "@mui/material";

import router from "router";

import "react-toastify/dist/ReactToastify.css";

const AppMiddleware = () => {
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

export const App = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUserUsername);
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    if (
      (!profile || profile.id < 0) &&
      isAuthenticated &&
      username &&
      !profile.isLoading
    ) {
      setTimeout(() => {
        dispatch(getProfile({ username }));
      }, 1000);
    }
    return () => {};
  }, [dispatch, isAuthenticated, profile, username]);

  return (
    <SidebarProvider>
      <BrowserRouter>
        <AppMiddleware />
      </BrowserRouter>
    </SidebarProvider>
  );
};
