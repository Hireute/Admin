import { useQuery } from "@tanstack/react-query";
import {  shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";


async function getBankInfo(id) {
  const { data } = await axiosInstance.get(`${shipmentendpoints.GET_BANK_INFO}/${id}`);
  return data;
}

export function useGetBankInfo({ id, showPaymentModal }) {
  return useQuery({
    queryKey: [shipmentendpoints.GET_BANK_INFO, id],
    queryFn: () => getBankInfo(id),
    enabled: !!id && showPaymentModal, 
  });
}
