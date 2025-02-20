import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axiosInstance from "../../../../services/axios"
import { faqendpoints } from "../../../../services/apis"

async function postFaq(faqSaveData){
    const token = faqSaveData.token;
    return axiosInstance.post(faqendpoints.POST_FAQ,faqSaveData,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
}
 export const PostFaqMutation = () => {
    const queryClient = useQueryClient()
     return useMutation({
        mutationFn:postFaq,

        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey:[faqendpoints.FAQ_LIST],
                refetchType:'all'
            })
            queryClient.refetchQueries([faqendpoints.FAQ_LIST])
          toast.success(res.data.message)
        },

        onError:(res) => {
            toast.error(res?.response?.data?.message)
        }
     })
}