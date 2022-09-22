import { axios } from "config/axios";
import { SUBMISSION_EP } from "constants/endpoints";
import { SubmissionsResponse } from "./types";

export const fetchSubmissions = async ({
  params,
}: {
  params: { page: number; [key: string]: string | number };
}) => {
  const { data } = await axios.get<SubmissionsResponse>(SUBMISSION_EP, {
    params,
  });
  return data;
};
