import React from "react";
import signin from "../../assets/signin.png";
import { useForm } from "react-hook-form";
import arrow from "../../assets/left_arrow.png";
import email from "../../assets/email_icon.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_2.png";
import ForgetPasswordOtp from "./https/ForgetPasswordOtp";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const { mutateAsync, isPending } = ForgetPasswordOtp();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
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
      <div className="md:w-1/2 bg-[#f2f2f2] flex items-center justify-center bg-[#0000000D] relative">
        <div className="max-w-md w-full px-8">
          {/* Form */}
          <div className="flex  items-center">
            <img className="w-4" src={arrow} alt="" />
            <Link to="/sign-in" className="text-xs">
              Back to login
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-4">
            Forget Your Password ?{" "}
          </h2>
          <p className="text-sm mb-8">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1 font-semibold">
                Email
              </label>
              <div className="flex justify-between items-center relative">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  placeholder="johndoe@gmail.com"
                  className="w-full p-3 rounded-md"
                />
                <div className="absolute right-2">
                  <img src={email} alt="" />
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#7F0284] text-white p-3 rounded-md font-bold mt-6"
            >
              {isPending ? "...Loading" : "Send OTP"}
            </button>

            {/* Already a member */}
            <div className="text-center mt-4  ">
              Don’t have an account?
              <a
                href="/sign-in"
                className="text-[#7F0284] ml-1 hover:underline font-semibold underline"
              >
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
