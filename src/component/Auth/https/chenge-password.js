import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axiosInstance from "../../../services/axios";
import toast from "react-hot-toast";
import { authendpoints } from "../../../services/apis";

async function resetPassword(data) {
  return axiosInstance.post(authendpoints.RESET_PASSWORD, data);
}

export function resetPasswodMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: resetPassword,

    onSuccess: async (res) => {
      toast.success(res.data.message);
      localStorage.removeItem("email");
      localStorage.removeItem("passwordChangeToken");
      navigate("/login");
    },

    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
}
