import { axios } from "config/axios";
import { PROBLEM_EP } from "constants/endpoints";
import { ProblemsResponse } from "./types";

export const fetchProblems = async ({
  params,
}: {
  params: { page: number; [key: string]: string | number };
}) => {
  const { data } = await axios.get<ProblemsResponse>(PROBLEM_EP, {
    params,
  });
  return data;
};
