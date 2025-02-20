import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../services/axios";
import { quoteendpoints } from "../../../../services/apis";

async function QuotesEmailList({ token, limit = 8, page = 1 }) {
  const params = {
    page,
    limit,
  };
  const { data } = await axiosInstance.get(quoteendpoints.QUOTE_LIST, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export function GetQuoteData({ token, limit = 8, page = 1 }) {
  return useQuery({
    queryKey: [quoteendpoints.QUOTE_LIST, { limit, page }],
    queryFn: () => QuotesEmailList({ token, page, limit }),
  });
}
