import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../../../../services/axios"
import { faqendpoints } from "../../../../services/apis"

 async function FAQList({token}){
    const {data} = await axiosInstance.get(faqendpoints.FAQ_LIST,{
        headers : {
            Authorization: `Bearer ${token}`
        }
    })
    return data.data
 }

export const GetFaqList = ({token}) => {
    return useQuery({
        queryKey:[faqendpoints.FAQ_LIST],
        queryFn:() => FAQList({token})
    })
}