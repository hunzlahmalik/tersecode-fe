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

export const fetchStatement = async ({ link }: { link: string }) => {
  const { data } = await axios.get<string>(link, {
    baseURL: "",
  });
  return data;
};

export const fetchSolution = fetchStatement;
