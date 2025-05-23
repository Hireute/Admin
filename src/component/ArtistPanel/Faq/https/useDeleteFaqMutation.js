import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import axiosInstance from "../../../../services/axios";
import { faqendpoints } from "../../../../services/apis";

async function FaqDelete( id ) {

  
  return axiosInstance.put(`${faqendpoints.DELETE_FAQ}/${id}`);
}

export const useDeleteFaqMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: FaqDelete,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [faqendpoints.FAQ_LIST],
        refetchType: "all",
      });
      queryClient.refetchQueries([faqendpoints.FAQ_LIST]);
      toast.success(res?.data?.message);
    },
    onError: (res) => {
      toast.error(res?.response?.data?.message);
    },
  });
};
