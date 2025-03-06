import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { BASE_URL, UTE_BASE_URL } from "../../api/apiUrl";

import { useNavigate } from "react-router-dom";
import { setUteJobId } from "../../../redux/slices/jobSlice";
import { useAppDispatch } from "../../../redux/typedReduxHooks";
import { shipmentendpoints } from "../../../../services/apis";
import axiosInstance from "../../../../services/axios";

async function ActiveDeactiveMutation(input) {
  return axiosInstance.put(
    `${shipmentendpoints.ACTIVE_DEACTIVE}/${input.id}?status=${input.isActive}`,
    input
  );
}

const useActiveDeactiveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ActiveDeactiveMutation,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["ActiveDeactiveMutation"],
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

export default useActiveDeactiveMutation;
