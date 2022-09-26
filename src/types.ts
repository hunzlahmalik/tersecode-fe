export interface ErrorResponse {
  detail: string;
  code: string;
}

export interface User {
  id: number;
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  date_joined: string;
  email: string;
  is_active: boolean;
  groups: [];
}

export interface Profile {
  id: number;
  bio: string;
  avatar: string;
  github: string;
  linkedin: string;
  country: string;
  user: User;
}

export type Difficulty = "E" | "M" | "H";

export interface Language {
  id: number;
  name: string;
  extension: string;
}

export interface Testcase {
  id: number;
  language: Language;
  input: (string | number)[];
  output: (string | number)[];
  hidden: boolean;
  runtime: number;
  memory: number;
}

export interface Discussion {
  id: number;
  content: string;
  created_at: string;
  user: number;
  username: string;
  avatar: string;
  problem: number;
}

export interface Solution {
  id: number;
  solution: string;
  created_at: string;
  updated_at: string;
  problem: number;
}

export type ProblemStatus = "Failed" | "Completed" | "Not Attempted";

export interface Problem {
  id: number;
  title: string;
  slug: string;
  statement: string;
  difficulty: Difficulty;
  tags: string[];
  testcases: Testcase[];
  discussion: Discussion[];
  solution: Solution | null;
  status: ProblemStatus | null;
}

export type SubmissionStatus =
  | "Pending"
  | "Running"
  | "Accepted"
  | "Wrong Answer"
  | "Time Limit Exceeded"
  | "Memory Limit Exceeded"
  | "Output Limit Exceeded"
  | "Runtime Error"
  | "Compilation Error";

export interface SubmissionAnalytics {
  id: number;
  submission: number;
  runtime: number;
  memory: number;
  status: SubmissionStatus;
  result: object;
}

export interface Submission {
  id: number;
  code: string;
  timestamp: string;
  user: number;
  problem: number;
  language: number;
  analytics: SubmissionAnalytics | null;
}
