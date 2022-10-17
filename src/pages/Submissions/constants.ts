import { SubmissionStatus } from "types";

export const STATUS_OPTIONS = [
  { value: "P", label: "Pending" },
  { value: "B", label: "Running" },
  { value: "A", label: "Accepted" },
  { value: "W", label: "Wrong Answer" },
  { value: "T", label: "Time Limit Exceeded" },
  { value: "M", label: "Memory Limit Exceeded" },
  { value: "O", label: "Output Limit Exceeded" },
  { value: "R", label: "Runtime Error" },
  { value: "C", label: "Compilation Error" },
  { value: "N", label: "Any" },
];

export const ORDER_OPTIONS = [
  {
    value: "id",
    label: "ID Ascending",
  },
  {
    value: "-id",
    label: "ID Descending",
  },
  {
    value: "status",
    label: "Status Ascending",
  },
  {
    value: "-status",
    label: "Status Descending",
  },
  {
    value: "timestamp",
    label: "Timestamp Ascending",
  },
  {
    value: "-timestamp",
    label: "Timestamp Descending",
  },
  {
    value: "problem",
    label: "Problem Ascending",
  },
  {
    value: "-problem",
    label: "Problem Descending",
  },
];

export const STATUS_MAP: Record<SubmissionStatus, { color: string }> = {
  Accepted: {
    color: "success",
  },
  "Wrong Answer": {
    color: "error",
  },
  "Time Limit Exceeded": {
    color: "error",
  },
  "Memory Limit Exceeded": {
    color: "error",
  },
  "Runtime Error": {
    color: "error",
  },
  "Compilation Error": {
    color: "error",
  },
  Running: {
    color: "warning",
  },
  Pending: {
    color: "warning",
  },
  "Output Limit Exceeded": {
    color: "error",
  },
};
