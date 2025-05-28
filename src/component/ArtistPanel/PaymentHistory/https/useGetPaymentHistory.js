import { useQuery } from "@tanstack/react-query";
import { requestendpoints, shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

// Accept page and limit as parameters
async function getAllPaymentList({ page = 1, limit = 10 , search="" } = {}) {
  const params = {
    page,
    limit,
    search
  };
  const { data } = await axiosInstance.get(shipmentendpoints.ALL_PAYMENT_LIST, {
    params,
  });
  return data;
}

export function useGetPaymentHistory({ page = 1, limit = 10 ,search="" } = {}) {
  return useQuery({
    queryKey: [shipmentendpoints.ALL_PAYMENT_LIST , page, limit , search],
    queryFn: () => getAllPaymentList({ page, limit,search }),
    enabled:true
  });
}
