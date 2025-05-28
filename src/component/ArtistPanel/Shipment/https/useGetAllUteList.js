import { useQuery } from "@tanstack/react-query";
import { requestendpoints, shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

// Accept page and limit as parameters
async function getAllUteList({ page = 1, limit = 10 , search="" } = {}) {
  const params = {
    page,
   pageSize: limit,
    search
  };

  
  const { data } = await axiosInstance.get(shipmentendpoints.ALL_UTE_LIST, {
    params,
  });
  return data;
}

export function useGetAllUteList({ page = 1, limit = 10 , search=""} = {}) {
  return useQuery({
    queryKey: [shipmentendpoints.ALL_UTE_LIST, page, limit , search],
    queryFn: () => getAllUteList({ page, limit , search }),
  });
}
