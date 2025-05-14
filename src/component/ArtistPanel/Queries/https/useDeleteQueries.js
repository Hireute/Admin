import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

async function deleteQueriesMutation(input) {
 
  return axiosInstance.put(
    `${shipmentendpoints.DELETE_QUERIES}/${input}`
  );
}

const useDeleteQueries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQueriesMutation,

    onSuccess: async (res) => {
      
      queryClient.invalidateQueries({
        queryKey: [shipmentendpoints.ALL_QUERIES],
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

export default useDeleteQueries;
