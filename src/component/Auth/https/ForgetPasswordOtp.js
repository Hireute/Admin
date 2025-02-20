import { useNavigate } from "react-router";
import { authendpoints } from "../../../services/apis";
import axiosInstance from "../../../services/axios";
import { useDispatch } from "react-redux";
import { setEmail } from "../../../store/userSlice/userSlice";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function forgetOtp(data) {
  return axiosInstance.post(authendpoints.FORGET_PASSWORD_OTP, data);
}
const ForgetPasswordOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: forgetOtp,

    onSuccess: async (res) => {
      dispatch(setEmail(res.data.email));
      console.log("res.data.emailres.data.email", res.data.email);

      localStorage.setItem("email", res.data.email);
      navigate("/otp", {
        replace: true,
      });
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default ForgetPasswordOtp;
