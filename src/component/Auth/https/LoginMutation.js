import { useNavigate } from "react-router";
import { authendpoints } from "../../../services/apis";
import axiosInstance from "../../../services/axios";
import { useDispatch } from "react-redux";
import { setIsAuthorized, setToken } from "../../../store/userSlice/userSlice";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function login(data) {
  return axiosInstance.post(authendpoints.SIGNIN_API, data);
}
const SigInInMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: login,

    onSuccess: async (res) => {
      dispatch(setToken(res.data.token));

      dispatch(setIsAuthorized(true));

      navigate("/", {
        replace: true,
      });
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default SigInInMutation;
