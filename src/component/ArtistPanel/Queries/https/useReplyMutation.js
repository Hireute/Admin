import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

async function useReplyQuery(input) {
  return axiosInstance.patch(`${shipmentendpoints.REPLY_QUERIES}`, input);
}

const useReplyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useReplyQuery,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [shipmentendpoints.ALL_USER_LIST],
        refetchType: "all",
      });

      toast.success(res.data.message);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });
};

export default useReplyMutation;
