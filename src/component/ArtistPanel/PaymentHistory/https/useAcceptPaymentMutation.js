import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../../services/axios";
import { shipmentendpoints } from "../../../../services/apis";

async function acceptManualPayment(id) {
  return axiosInstance.put(`${shipmentendpoints.ACCEPT_MANUAL_PAYMENT}/${id}`);
}
export const useAcceptPaymentMutation = (setProcessingId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptManualPayment,

    onSuccess: (res) => {
   
      queryClient.invalidateQueries({
        queryKey: [shipmentendpoints.ALL_MANUAL_PAYMENT_LIST],
        refetchType: "all",
      });
    
     
      toast.success(res.data.message);
    },

    onError: (res) => {
      setProcessingId(null)
      toast.error(res?.response?.data?.message);
    },
  });
};
