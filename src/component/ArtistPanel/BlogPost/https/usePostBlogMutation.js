import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../../services/axios";
import { blogEndpoints, faqendpoints } from "../../../../services/apis";

async function postBlog(faqSaveData) {
  return axiosInstance.post(blogEndpoints.CREATE_BLOG, faqSaveData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export const usePostBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postBlog,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [blogEndpoints.ALL_BLOG],
        refetchType: "all",
      });
      queryClient.refetchQueries([blogEndpoints.ALL_BLOG]);
      toast.success(res.data.message);
    },

    onError: (res) => {
      toast.error(res?.response?.data?.message);
    },
  });
};
