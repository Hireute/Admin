import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

async function deleteUteMutation(input) {
 
  return axiosInstance.delete(
    `${shipmentendpoints.DELETE_UTE}/${input}`
  );
}

const useDeleteUte = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUteMutation,

    onSuccess: async (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: [shipmentendpoints.ALL_UTE_LIST],
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

export default useDeleteUte;
