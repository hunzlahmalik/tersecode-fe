import { FC, ReactNode, useEffect } from "react";
import { Box, alpha, lighten, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "state";
import { logOut } from "state/actions";
import { getProfile } from "state/profile/actions";
import { selectProfile } from "state/profile/selectors";
import {
  selectUserUsername,
  selectUserExp,
  selectUserIsAuthenticated,
} from "state/user/selectors";
import SuspenseLoader from "components/SuspenseLoader";
import Header from "./Header";

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUserUsername);
  const exp = useAppSelector(selectUserExp);
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    if (profile.id < 0 && isAuthenticated) {
      setTimeout(() => {
        dispatch(getProfile({ username }));
      }, 1000);
    }
    if (exp && exp <= Date.now()) {
      dispatch(logOut);
    }
  }, [dispatch, exp, isAuthenticated, profile, username]);

  let boxShadow = `0 1px 0 ${alpha(
    lighten(theme.colors.primary.main, 0.7),
    0.15
  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`;

  if (theme.palette.mode === "light") {
    boxShadow = `0px 2px 4px -3px ${alpha(
      theme.colors.alpha.black[100],
      0.1
    )}, 0px 5px 12px -4px ${alpha(theme.colors.alpha.black[100], 0.05)}`;
  }

  if (!isAuthenticated || profile.id < 0) {
    return <SuspenseLoader />;
  }

  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",

        ".MuiPageTitle-wrapper": {
          background:
            theme.palette.mode === "dark"
              ? theme.colors.alpha.trueWhite[5]
              : theme.colors.alpha.white[50],
          marginBottom: `${theme.spacing(4)}`,
          boxShadow,
        },
      }}
    >
      <Header />
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          display: "block",
          flex: 1,
          pt: `${theme.header.height}`,
        }}
      >
        <Box display="block">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
