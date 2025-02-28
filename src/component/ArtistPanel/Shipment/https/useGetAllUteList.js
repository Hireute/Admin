import { useQuery } from "@tanstack/react-query";
import { requestendpoints, shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

// Accept page and limit as parameters
async function getAllUteList({ page = 1, limit = 10 } = {}) {
  const params = {
    page,
    limit,
  };
  const { data } = await axiosInstance.get(shipmentendpoints.ALL_UTE_LIST, {
    params,
  });
  return data;
}

export function useGetAllUteList({ page = 1, limit = 10 } = {}) {
  return useQuery({
    queryKey: ["uteList", page, limit], // Unique key with parameters
    queryFn: () => getAllUteList({ page, limit }),
  });
}
