export const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || "http://0.0.0.0:8000";
export const API = `${SERVER_URL}/api/v1`;
export const LOGIN_EP = "token/";
export const SIGNUP_EP = "users/signup/";
export const TOK_REFRESH_EP = "token/refresh/";

export const PROFILE_EP = "profile/";
export const PROBLEM_EP = "problems/";
export const SUBMISSION_EP = "submissions/";
