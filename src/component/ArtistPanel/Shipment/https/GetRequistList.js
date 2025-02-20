import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../services/axios";
import { requestendpoints } from "../../../../services/apis";

async function fatchRequestList({ token, limit = 8, page = 1 }) {
  const params = {
    page,
    limit,
  };
  const { data } = await axiosInstance.get(requestendpoints.REQUEST_LIST, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export function GetRequestData({ token, limit = 8, page = 1 }) {
  return useQuery({
    queryKey: [requestendpoints.REQUEST_LIST, { limit, page }],
    queryFn: () => fatchRequestList({ token, page, limit }),
  });
}
