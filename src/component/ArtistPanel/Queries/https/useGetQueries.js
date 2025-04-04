import { useQuery } from "@tanstack/react-query";
import { requestendpoints, shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

// Accept page and limit as parameters
async function getAllQueriesList({ page = 1, limit = 10 } = {}) {
  const params = {
    page,
    limit,
  };
  const { data } = await axiosInstance.get(shipmentendpoints.ALL_QUERIES, {
    params,
  });
  return data;
}

export function useGetQueries({ page = 1, limit = 10 } = {}) {
  return useQuery({
    queryKey: [shipmentendpoints.ALL_QUERIES , page, limit],
    queryFn: () => getAllQueriesList({ page, limit }),
  });
}
