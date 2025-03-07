import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../../services/axios";
import { blogEndpoints, faqendpoints } from "../../../../services/apis";

async function UpdateBLog(data) {
  console.log("data contents:", data);

  return axiosInstance.put(
    blogEndpoints.UPADTE_BLOG + `/${data.id}`,
    data.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export const useUpdateBLogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateBLog,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [blogEndpoints.ALL_BLOG],
        refetchType: "all",
      });
      queryClient.refetchQueries([blogEndpoints.ALL_BLOG]);
      toast.success(res?.data?.message);
    },

    onError: (res) => {
      toast.error(res?.response?.data?.message);
    },
  });
};
