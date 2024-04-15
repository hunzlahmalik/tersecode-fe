import { axios } from "config/axios";
import { SUBMISSION_EP } from "constants/endpoints";
import { Submission } from "types";
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

const recvFetch = async ({
  params,
}: Parameters<typeof fetchSubmissions>["0"]): Promise<Submission[]> => {
  const { results, next } = await fetchSubmissions({ params });
  if (next) {
    const nextData = await recvFetch({
      params: { ...params, page: 1 + params.page },
    });
    return [...results, ...nextData];
  }
  return results;
};

export const fetchAllSubmissions = async ({
  params,
}: {
  params: { [key: string]: string | number };
}) => {
  return recvFetch({ params: { ...params, page: 1 } });
};
