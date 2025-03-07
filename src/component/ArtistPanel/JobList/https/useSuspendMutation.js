import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

async function suspendMutation(id) {
  return axiosInstance.patch(`${shipmentendpoints.SUSPEND_USER}/${id}`);
}

const useSuspendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: suspendMutation,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [shipmentendpoints.ALL_JOB_LIST],
        refetchType: "all",
      });

      toast.success(res.data.message);
    },
    onError: (error) => {
      const errorMessage = toast.error(errorMessage);
    },
  });
};

export default useSuspendMutation;
