import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  styled,
  useTheme,
} from "@mui/material";

import Logo from "components/LogoSign";
import HeaderButtons from "./Buttons";
import HeaderUserbox from "./Userbox";
import HeaderMenu from "./Menu";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background as string, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
`
);

const Header = () => {
  const theme = useTheme();

  let boxShadow = `0 1px 0 ${alpha(
    lighten(theme.colors.primary.main, 0.7),
    0.15
  )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`;

  if (theme.palette.mode === "light") {
    boxShadow = `0px 2px 8px -3px ${alpha(
      theme.colors.alpha.black[100],
      0.2
    )}, 0px 5px 22px -4px ${alpha(theme.colors.alpha.black[100], 0.1)}`;
  }

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow,
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        <Box
          mx={2}
          sx={{
            width: 52,
          }}
        >
          <Logo />
        </Box>
        <HeaderMenu />
      </Stack>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        <HeaderUserbox />
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
