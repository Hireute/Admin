import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../../services/axios";
import { shipmentendpoints } from "../../../../services/apis";

async function Updatestop({ updatedData, updatedStopsId, token }) {
  return axiosInstance.put(
    shipmentendpoints.UPDATE_SHIPMENT_STOP + `/${updatedStopsId}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export const EditShipmentStop = () => {
  return useMutation({
    mutationFn: Updatestop,

    onSuccess: (res) => {
      toast.success(res?.data?.message);
    },

    onError: (res) => {
      toast.error(res?.response?.data?.message);
    },
  });
};
