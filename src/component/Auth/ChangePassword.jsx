import React, { useState } from "react";
import signin from "../../assets/signin.png";
import { useForm } from "react-hook-form";
import arrow from "../../assets/left_arrow.png";
// import password from "../assets/password_icon'.png";
import { Link } from "react-router-dom";
import password_icon from "../../assets/password_icon'.png";
import visible_icon from "../../assets/visible_icon.png";
import logo from "../../assets/logo_2.png";
import { useSelector } from "react-redux";
import { resetPasswodMutation } from "./https/chenge-password";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const { passwordChangeToken } = useSelector((state) => state.user);
  const { mutateAsync, isPending } = resetPasswodMutation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.token = passwordChangeToken;
    try {
      await mutateAsync(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen ">
      {/* Left Side: Image Section */}
      <div className="md:w-1/2 relative">
        <img
          src={signin}
          alt="Containers"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-10 left-10 text-white text-2xl font-bold xl:text-4xl">
          <p>Your Gateway to any</p>
          <p>Destination in the World.</p>
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="md:w-1/2 bg-[#f2f2f2] flex items-center justify-center relative">
        <div className="max-w-md w-full px-8">
          {/* Form */}
          <div className="flex  items-center">
            <img className="w-4" src={arrow} alt="" />
            <Link to="/sign-in" className="text-xs">
              Back to login
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-4">Verify Code</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="md:w-full">
                <label className="block text-gray-700 mb-1 font-semibold">
                  Password
                </label>
                <div className="flex justify-between items-center relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="********"
                    className="w-full border-gray-300 p-3 rounded-md"
                  />
                  <div
                    className="absolute right-2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <img
                      className="w-6"
                      src={showPassword ? visible_icon : password_icon}
                      alt={showPassword ? "Hide password" : "Show password"}
                    />
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="md:w-full">
                <label className="block text-gray-700 mb-1 font-semibold">
                  Confirm Password
                </label>
                <div className="flex justify-between relative items-center">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="********"
                    className="w-full p-3 rounded-md"
                  />

                  <div
                    className="absolute right-2 cursor-pointer"
                    onClick={togglePasswordVisibility1}
                  >
                    <img
                      className="w-6"
                      src={showPassword1 ? visible_icon : password_icon}
                      alt={showPassword1 ? "Hide password" : "Show password"}
                    />
                  </div>
                </div>
                {errors.newpassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newpassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Change password Button */}
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-md font-semibold mt-6"
            >
              {isPending ? "...Loading" : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
