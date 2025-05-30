import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../../services/axios";
import { blogEndpoints,shipmentendpoints } from "../../../../services/apis";

async function tansferManualAmount(values) {
  return axiosInstance.post(`${shipmentendpoints.TRANSFER_AMOUNT}/${values?.id}/${values?.bookingId}`);
}
export const useTransferManualJobeMutaion = (setProcessingId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tansferManualAmount,

    onSuccess: (res) => {
   
      queryClient.invalidateQueries({
        queryKey: [shipmentendpoints.ALL_BOOKING_JOB_LIST],
        refetchType: "all",
      });
      queryClient.refetchQueries([blogEndpoints.ALL_BLOG]);
     
      toast.success(res.data.message);
    },

    onError: (res) => {
      setProcessingId(null)
      toast.error(res?.response?.data?.message);
    },
  });
};
