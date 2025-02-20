import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../services/axios';
import {  requestendpoints, shipmentendpoints } from '../../../../services/apis';


async function fatchAllShipmentList({token,limit = 8, page = 1 }) {
 const params = {
    page,
    limit
 }
  const { data } = await axiosInstance.get(shipmentendpoints.ALL_SHIPMENT_LIST, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export function GetAllShipmentData({token,limit = 8, page = 1}) {
  return useQuery({
    queryKey: [requestendpoints.REQUEST_LIST,{ limit, page }],
    queryFn: () => fatchAllShipmentList({token,page,limit}),
  });
}
