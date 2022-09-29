import { Box, Container, Link, Typography, styled } from "@mui/material";

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

const Footer = () => {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: "block", md: "flex" }}
        alignItems="center"
        textAlign={{ xs: "center", md: "left" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">&copy; 2022 - Tersecode</Typography>
        </Box>
      </Box>
    </FooterWrapper>
  );
};

export default Footer;
