import { useQuery } from "@tanstack/react-query";



import { setIsAuthorized, updateUser } from "../store/userSlice/userSlice";

import { shipmentendpoints } from "./apis";
import { useDispatch } from "react-redux";
import axiosInstance from "./axios";


const useCheckIsAuthorized = () => {
  const dispatch = useDispatch();

  async function getUser() {
    const { data } = await axiosInstance.get(`${shipmentendpoints.CHECK_TOKEN}`);
    return data;
  }

  const fetchUser = async () => {
    try {
      const res = await getUser();


      
      dispatch(setIsAuthorized(true));
      dispatch(updateUser(res.user))
     
      return res;
    } catch (error) {
      dispatch(setIsAuthorized(false));
      return error;
    }
  };

  return useQuery({
    queryKey: [ "signin"],
    queryFn: fetchUser,
    enabled: true,
  });
};

export default useCheckIsAuthorized;
