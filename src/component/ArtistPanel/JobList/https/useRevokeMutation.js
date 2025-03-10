import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

async function revokeMutation(input) {
  console.log("hello");
  return axiosInstance.patch(
    `${shipmentendpoints.REVOKE_USER}/${input.id}?status=${input.status}`
  );
}

const useRevokeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeMutation,

    onSuccess: async (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: [shipmentendpoints.ALL_JOB_LIST],
        refetchType: "all",
      });

      console.log(res.data.message);

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

export default useRevokeMutation;
