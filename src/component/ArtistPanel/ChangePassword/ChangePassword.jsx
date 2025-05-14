
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authendpoints } from "../../../services/apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axios";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
   
    try {
      const response = await axiosInstance.post(authendpoints.CHANGE_PASSWORD, data);

      toast.success(response?.data?.message);
      localStorage.removeItem("token");
      navigate("/sign-in");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-1">Current Password</label>
            <input
              type={showPassword.current ? "text" : "password"}
              className="w-full p-2 border rounded pr-10"
              {...register("oldPassword", {
                required: "Current password is required",
              })}
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => togglePassword("current")}
            >
              {showPassword.current ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type={showPassword.new ? "text" : "password"}
              className="w-full p-2 border rounded pr-10"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => togglePassword("new")}
            >
              {showPassword.new ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type={showPassword.confirm ? "text" : "password"}
              className="w-full p-2 border rounded pr-10"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => togglePassword("confirm")}
            >
              {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] font-bold py-2 px-4 rounded-md mt-4"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
