import {
  Tooltip,
  Badge,
  TooltipProps,
  tooltipClasses,
  styled,
  useTheme,
} from "@mui/material";

import {
  LogoWrapper,
  LogoSignWrapper,
  LogoSign,
  LogoSignInner,
} from "./styled";

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: "bold",
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}));

const Logo = () => {
  const theme = useTheme();

  return (
    <TooltipWrapper title="Tersecode" arrow>
      <LogoWrapper to="/overview">
        <Badge
          sx={{
            ".MuiBadge-badge": {
              fontSize: theme.typography.pxToRem(11),
              right: -2,
              top: 8,
            },
          }}
          overlap="circular"
          color="success"
          badgeContent="1.0"
        >
          <LogoSignWrapper>
            <LogoSign>
              <LogoSignInner />
            </LogoSign>
          </LogoSignWrapper>
        </Badge>
      </LogoWrapper>
    </TooltipWrapper>
  );
};

export default Logo;
