import { useMutation, useQuery } from '@tanstack/react-query';

import { shipmentendpoints } from '../../../../services/apis';
import axiosInstance from '../../../../services/axios';



async function fatchAllShipmentList() {

  const { data } = await axiosInstance.get(shipmentendpoints.ALL_SHIPMENT_DASHBOARD_LIST);
  return data;
}

export function GetAllShipmentData() {
  return useQuery({
    queryKey: ["fatchAllShipmentList"],
    queryFn:  fatchAllShipmentList,
  });
}
