import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axiosInstance from "../../../../services/axios"
import { faqendpoints } from "../../../../services/apis"

async function UpdateFaq(faqUpdateSaveData){
    const token = faqUpdateSaveData.token
    const id = faqUpdateSaveData.id
    return axiosInstance.put(faqendpoints.EDIT_FAQ + `/${id}`,faqUpdateSaveData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const EditFaq = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:UpdateFaq,

        onSuccess:(res) => {
            queryClient.invalidateQueries({
                queryKey:[faqendpoints.FAQ_LIST],
                refetchType:'all'
            })
            queryClient.refetchQueries([faqendpoints.FAQ_LIST])
            toast.success(res?.data?.message)
        },

        onError:(res) => {
           toast.error(res?.response?.data?.message)
        }
    })
}