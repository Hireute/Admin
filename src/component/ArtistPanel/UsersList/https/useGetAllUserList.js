import { useQuery } from "@tanstack/react-query";
import { requestendpoints, shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

// Accept page and limit as parameters
async function getAllUteList({ page = 1, limit = 10 } = {}) {
  const params = {
    page,
    limit,
  };
  const { data } = await axiosInstance.get(shipmentendpoints.ALL_USER_LIST, {
    params,
  });
  return data;
}

export function useGetAllUserList({ page = 1, limit = 10 } = {}) {
  return useQuery({
    queryKey: [shipmentendpoints.ALL_USER_LIST, page, limit],
    queryFn: () => getAllUteList({ page, limit }),
  });
}
