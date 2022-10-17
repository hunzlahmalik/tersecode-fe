const EMAIL_RE =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (
  email: string
): {
  valid: boolean;
  message: string;
} => {
  const valid = EMAIL_RE.test(email);

  return {
    valid,
    message: valid ? "" : "Please enter a valid email address",
  };
};

export const validatePassword = (
  password: string
): {
  valid: boolean;
  message: string;
} => {
  const valid = password.length >= 3;

  return {
    valid,
    message: valid ? "" : "Password must be at least 8 characters long",
  };
};
