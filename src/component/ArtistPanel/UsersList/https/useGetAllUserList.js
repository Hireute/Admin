import { useQuery } from "@tanstack/react-query";
import { shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

async function getAllUteList({ page = 1, limit = 10, search = "" } = {}) {
  const params = {
    page,
    limit,
    search,
  };
  const { data } = await axiosInstance.get(shipmentendpoints.ALL_USER_LIST, {
    params,
  });

  return data;
}

export function useGetAllUserList({ page = 1, limit = 10, search = "" } = {}) {
  return useQuery({
    queryKey: [shipmentendpoints.ALL_USER_LIST, page, limit, search],
    queryFn: () => getAllUteList({ page, limit, search }),
    keepPreviousData: true, 
  });
}
