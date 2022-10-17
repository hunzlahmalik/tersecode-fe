import { Box, Tooltip } from "@mui/material";
import {
  LogoWrapper,
  LogoSignWrapper,
  LogoSign,
  LogoSignInner,
  LogoTextWrapper,
  LogoText,
  VersionBadge,
} from "./styled";

const Logo = () => {
  return (
    <LogoWrapper to="/">
      <LogoSignWrapper>
        <LogoSign>
          <LogoSignInner />
        </LogoSign>
      </LogoSignWrapper>
      <Box
        component="span"
        sx={{
          display: { xs: "none", sm: "inline-block" },
        }}
      >
        <LogoTextWrapper>
          <Tooltip title="Version 2.0" arrow placement="right">
            <VersionBadge>1.0</VersionBadge>
          </Tooltip>
          <LogoText>Tersecode</LogoText>
        </LogoTextWrapper>
      </Box>
    </LogoWrapper>
  );
};

export default Logo;
