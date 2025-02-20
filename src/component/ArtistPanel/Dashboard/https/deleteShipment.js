import { useMutation, useQueryClient } from "@tanstack/react-query"

import toast from "react-hot-toast"
import axiosInstance from "../../../../services/axios"
import { shipmentendpoints } from "../../../../services/apis"


async function ShipmentDelete({id,token}){
    return axiosInstance.delete(shipmentendpoints.DELETE_SHIPMENT + `/${id}`,{
        headers : {
            Authorization: `Bearer ${token}`
        }
    })
}  

export const DeleteShipment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:ShipmentDelete,

        onSuccess:(res) => {
            queryClient.invalidateQueries({
                queryKey:[shipmentendpoints.ALL_SHIPMENT_DASHBOARD_LIST],
                refetchType:'all'
             })
             queryClient.refetchQueries([shipmentendpoints.ALL_SHIPMENT_DASHBOARD_LIST])
           toast.success(res?.data?.message)
        },
        onError:(res) => {
           toast.error(res?.response?.data?.message)
        }
    })
}