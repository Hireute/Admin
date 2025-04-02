import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import axiosInstance from "../../../../services/axios";
import { blogEndpoints, faqendpoints } from "../../../../services/apis";

async function blogDelete(id) {
  return axiosInstance.put(blogEndpoints.DELETE_BLOG + `/${id}`);
}

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogDelete,

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
