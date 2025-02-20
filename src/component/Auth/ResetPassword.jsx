import React from "react";
import signin from "../../assets/signin.png";
import { useForm } from "react-hook-form";
import arrow from "../../assets/left_arrow.png";
import icon from "../../assets/logo_2.png";
import password_icon from "../../assets/password_icon'.png";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {};
  return (
    <div className="flex flex-col md:flex-row h-screen">
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
          <div className="absolute top-6 right-4">
            <img src={icon} alt="" />
          </div>

          {/* Form */}
          <div className="flex  items-center">
            <img className="w-4" src={arrow} alt="" />
            <Link to="/sign-in" className="text-xs">
              Back to login
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-4">Reset Password</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="flex space-x-4 mb-6">
              <div className="w-full">
                <label className="block text-gray-700 mb-1 font-semibold">
                  {" "}
                  Password
                </label>
                <div className="flex items-center justify-between relative">
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="********"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                  <div className="absolute right-2">
                    <img src={password_icon} alt="" />
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <div className="w-full">
                <label className="block text-gray-700 mb-1 font-semibold">
                  Confirm Password
                </label>
                <div className="flex justify-between relative items-center">
                  <input
                    type="password"
                    {...register("newpassword", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="********"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />

                  <div className="absolute right-2">
                    <img src={password_icon} alt="" />
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
              className="w-full bg-[#7F0284] text-white p-3 rounded-md font-semibold mt-6"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
