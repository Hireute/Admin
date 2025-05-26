import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../../services/axios";
import { shipmentendpoints } from "../../../../services/apis";

async function deleteJobBooking(id) {
  return axiosInstance.put(`${shipmentendpoints.DELETE_JOB_BOOKING}/${id}`);
}
export const useDeleteJobBookingMutation = (setProcessingId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJobBooking,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [shipmentendpoints.ALL_BOOKING_JOB_LIST],
        refetchType: "all",
      });

      toast.success(res.data.message);
    },

    onError: (res) => {
      setProcessingId(null);
      toast.error(res?.response?.data?.message);
    },
  });
};
