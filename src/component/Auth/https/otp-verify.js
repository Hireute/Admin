import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setPasswordChangeToken } from "../../../store/userSlice/userSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { authendpoints } from "../../../services/apis";
import axiosInstance from "../../../services/axios";

async function otpVerify(data) {
  const newEmail = localStorage.getItem("email");
  return axiosInstance.post(authendpoints.VALID_OTP + `/${newEmail}`, data);
}

export function otpVerifyMutation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: otpVerify,

    onSuccess: async (res) => {
      dispatch(setPasswordChangeToken(res.data.token));
      toast.success(res.data.message);
      navigate("/change-password");
    },

    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
}
