import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../services/axios";
import { shipmentendpoints } from "../../../../services/apis";

async function fatchAllShipmentList({ userId, token }) {
  const { data } = await axiosInstance.get(
    shipmentendpoints.SHIPMENT_DELEVERY_DETAIL + `/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
}

export function GetSingleShipmentData({ userId, token }) {
  return useQuery({
    queryKey: [shipmentendpoints.SHIPMENT_DELEVERY_DETAIL, { userId }],
    queryFn: () => fatchAllShipmentList({ userId, token }),
    enabled: !!userId,
  });
}
