import { useQuery } from "@tanstack/react-query";
import { shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

async function getAllUteList(id) {
  const { data } = await axiosInstance.get(`${shipmentendpoints.USER_ACTIVITY}/${id}`);
  return data;
}

export function useGetUserActivity(id) {
  return useQuery({
    queryKey: [shipmentendpoints.USER_ACTIVITY],
    queryFn: () => getAllUteList(id),
    keepPreviousData: true, 
  });
}
