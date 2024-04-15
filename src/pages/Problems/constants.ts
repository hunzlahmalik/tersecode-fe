export const DIFFICULTY_OPTIONS = [
  { value: "E", label: "Easy" },
  { value: "M", label: "Medium" },
  { value: "H", label: "Hard" },
  { value: "A", label: "All" },
];

export const ORDER_OPTIONS = [
  {
    value: "id",
    label: "Id Ascending",
  },
  {
    value: "-id",
    label: "Id Descending",
  },
  {
    value: "title",
    label: "Title Ascending",
  },
  {
    value: "-title",
    label: "Title Descending",
  },
  {
    value: "difficulty",
    label: "Difficulty Ascending",
  },
  {
    value: "-difficulty",
    label: "Difficulty Descending",
  },
];

export const DIFFICULTY_MAP = {
  E: {
    text: "Easy",
    color: "success",
  },
  M: {
    text: "Medium",
    color: "warning",
  },
  H: {
    text: "Hard",
    color: "error",
  },
};
