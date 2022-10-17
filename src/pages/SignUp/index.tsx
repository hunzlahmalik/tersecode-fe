import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import { signUpWithToast } from "state/user/actions";
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
import { selectUserIsAuthenticated } from "state/user/selectors";
import { validateEmail, validatePassword } from "utils/validations";

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

const SignUp = () => {
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
    username: {
      value: "",
      error: false,
      helperText: "",
    },
  });

  if (useAppSelector(selectUserIsAuthenticated)) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  const validateValues = (data: typeof values) => {
    const valuesCopy = {
      email: { ...data.email },
      password: { ...data.password },
      username: { ...data.username },
    };

    let v = validateEmail(valuesCopy.email.value);
    valuesCopy.email.error = !v;
    valuesCopy.email.helperText = v.message;

    v = validatePassword(valuesCopy.email.value);
    valuesCopy.password.error = !v;
    valuesCopy.password.helperText = v.message;

    if (valuesCopy.username.value === "") {
      valuesCopy.username.error = true;
      valuesCopy.username.helperText = "Username is required";
    } else if (valuesCopy.username.value !== "") {
      valuesCopy.username.error = false;
      valuesCopy.username.helperText = "";
    }

    setValues(valuesCopy);

    return !valuesCopy.email.error && !valuesCopy.password.error;
  };

  const handleSubmit = () => {
    if (validateValues(values)) {
      console.info("sign up");
      signUpWithToast(dispatch, {
        email: values.email.value,
        password: values.password.value,
        username: values.username.value,
      });
    }
  };

  return (
    <OverviewWrapper>
      <Helmet>
        <title>SignUp - Tersecode</title>
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
                    SignUp
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
                      <FormControl fullWidth sx={{ m: 1 }} required>
                        <InputLabel htmlFor="outlined-required">
                          Username
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-required"
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          }
                          type="text"
                          label="username"
                          value={values.username.value}
                          onChange={(event) => {
                            const newData = {
                              ...values,
                              username: {
                                ...values.username,
                                value: event.target.value,
                              },
                            };
                            setValues(newData);
                            validateValues(newData);
                          }}
                          error={values.username.error}
                        />
                        <FormHelperText id="outlined-helper-text">
                          {values.username.error && values.username.helperText}
                        </FormHelperText>
                      </FormControl>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        size="large"
                        sx={{ m: 1 }}
                        disabled={values.email.error || values.password.error}
                      >
                        SignUp
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have account?{" "}
                <Button
                  variant="text"
                  color="primary"
                  component={NavLink}
                  to="/login"
                >
                  Login
                </Button>
              </Typography>
            </Box>
          </Container>
        </Card>
      </Container>
    </OverviewWrapper>
  );
};

export default SignUp;
