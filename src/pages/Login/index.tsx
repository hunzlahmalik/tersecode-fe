import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { loginWithToast } from "state/user/actions";
import { useAppDispatch, useAppSelector } from "state";
import {
  styled,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Container,
} from "@mui/material";
import { AccountCircle, PasswordRounded } from "@mui/icons-material";

import Logo from "components/LogoSign";
import {
  selectUserIsAuthenticated,
  selectUserUsername,
} from "state/user/selectors";
import { getProfileWithToast } from "state/profile/actions";

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: {
      value: "",
      error: false,
      helperText: "",
    },
    password: {
      value: "",
      error: false,
      helperText: "",
    },
  });

  const username = useAppSelector(selectUserUsername);
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      getProfileWithToast(dispatch, { username });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [dispatch, isAuthenticated, navigate, username]);

  const validateValues = (data: typeof values) => {
    const valuesCopy = {
      email: { ...data.email },
      password: { ...data.password },
    };

    if (valuesCopy.email.value === "") {
      valuesCopy.email.error = true;
      valuesCopy.email.helperText = "Email is required";
    } else if (valuesCopy.email.value !== "") {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(valuesCopy.email.value)) {
        valuesCopy.email.error = true;
        valuesCopy.email.helperText = "Invalid email";
      } else {
        valuesCopy.email.error = false;
        valuesCopy.email.helperText = "";
      }
    }

    if (valuesCopy.password.value === "") {
      valuesCopy.password.error = true;
      valuesCopy.password.helperText = "Password is required";
    } else if (valuesCopy.password.value !== "") {
      if (valuesCopy.password.value.length < 2) {
        valuesCopy.password.error = true;
        valuesCopy.password.helperText =
          "Password must be at least 8 characters";
      } else {
        valuesCopy.password.error = false;
        valuesCopy.password.helperText = "";
      }
    }

    setValues(valuesCopy);

    return !valuesCopy.email.error && !valuesCopy.password.error;
  };

  const handleSubmit = () => {
    if (validateValues(values)) {
      console.info("login");
      loginWithToast(dispatch, {
        email: values.email.value,
        password: values.password.value,
      });
    }
  };

  return (
    <OverviewWrapper>
      <Helmet>
        <title>Login - Tersecode</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <Logo />
        </Box>
        <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
          <Container maxWidth="lg" sx={{ textAlign: "center" }}>
            <Grid
              spacing={{ xs: 6, md: 10 }}
              justifyContent="center"
              alignItems="center"
              container
            >
              <Grid item md={10} lg={8} mx="auto">
                <Card>
                  <TypographyH1 sx={{ mb: 2, mt: 4 }} variant="h1">
                    Login
                  </TypographyH1>

                  <CardContent>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <FormControl fullWidth sx={{ m: 1 }} required>
                        <InputLabel htmlFor="outlined-required">
                          Email
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-required"
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          }
                          type="email"
                          label="Email"
                          value={values.email.value}
                          onChange={(event) => {
                            const newData = {
                              ...values,
                              email: {
                                ...values.email,
                                value: event.target.value,
                              },
                            };
                            setValues(newData);
                            validateValues(newData);
                          }}
                          error={values.email.error}
                        />
                        <FormHelperText id="outlined-helper-text">
                          {values.email.error && values.email.helperText}
                        </FormHelperText>
                      </FormControl>
                      <FormControl fullWidth sx={{ m: 1 }} required>
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type="password"
                          label="Password"
                          startAdornment={
                            <InputAdornment position="start">
                              <PasswordRounded />
                            </InputAdornment>
                          }
                          // endAdornment={
                          //   <InputAdornment position="end">
                          //     <Button
                          //       variant="text"
                          //       color="primary"
                          //       component={RouterLink}
                          //       to="/forgot-password"
                          //     >
                          //       Forgot Password?
                          //     </Button>
                          //   </InputAdornment>
                          // }
                          value={values.password.value}
                          onChange={(event) => {
                            const newData = {
                              ...values,
                              password: {
                                ...values.password,
                                value: event.target.value,
                              },
                            };
                            setValues(newData);
                            validateValues(newData);
                          }}
                          error={values.password.error}
                        />
                        <FormHelperText id="outlined-helper-text">
                          {values.password.error && values.password.helperText}
                        </FormHelperText>
                      </FormControl>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSubmit()}
                        size="large"
                        sx={{ m: 1 }}
                        disabled={values.email.error || values.password.error}
                      >
                        Login
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Card>
      </Container>
    </OverviewWrapper>
  );
};

export default Login;
