import React from "react";
import signin from "../../assets/signin.png";
import { useForm } from "react-hook-form";
import arrow from "../../assets/left_arrow.png";
import email from "../../assets/email_icon.png";
import { Navigate, useNavigate } from "react-router-dom";
import { otpVerifyMutation } from "./https/otp-verify";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Otp = () => {
  const { email } = useSelector((state) => state.user);
  const { mutateAsync, isPending } = otpVerifyMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.email = email;
      mutateAsync(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side: Image Section */}
      <div className="w-1/2 relative">
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
      <div className="w-1/2 bg-[#f2f2f2] flex items-center justify-center ">
        <div className="max-w-md w-full px-8">
          {/* Form */}
          <div className="flex  items-center">
            <img className="w-4" src={arrow} alt="" />
            <p
              className="text-xs hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Back to login
            </p>
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-4">Set a Password </h2>
          <p className="text-sm mb-8 text-gray-600">
            Your previous password has been reseted. Please set a new password
            for your account.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1 font-semibold">
                Enter Code
              </label>
              <div className="flex justify-between items-center relative">
                <input
                  type="text"
                  {...register("otp", {
                    required: " required",
                  })}
                  placeholder="778gBM6X"
                  className="w-full p-3 rounded-md"
                />
                <div className="right-2 absolute">
                  <img src={email} alt="" />
                </div>
              </div>
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.code.message}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <p>Didn't receive code?</p>
              <p
                className="text-red-500 border-b border-red-400 font-semibold hover:cursor-pointer"
                onClick={() => navigate("/forget-password")}
              >
                Resend
              </p>
            </div>

            {/* Send otp Button */}
            <button
              type="submit"
              className="w-full bg-[#7F0284] text-white p-3 rounded-md font-semibold mt-6"
            >
              {isPending ? "...Loading" : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
