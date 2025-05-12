import { useQuery } from "@tanstack/react-query";
import { shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

// Accept page and limit as parameters
async function getAllManualPaymentList({ page = 1, limit = 10 } = {}) {
  const params = {
    page,
    limit,
  };
  const { data } = await axiosInstance.get(shipmentendpoints. ALL_MANUAL_PAYMENT_LIST);
  return data;
}

export function useGetManualPayments({ page = 1, limit = 10 } = {}) {
  return useQuery({
    queryKey: [shipmentendpoints.ALL_MANUAL_PAYMENT_LIST],
    queryFn: () => getAllManualPaymentList({ page, limit }),
    enabled:true
  });
}
