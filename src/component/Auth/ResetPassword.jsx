import React from "react";
import signin from "../../assets/signin.png";
import { useForm } from "react-hook-form";
import arrow from "../../assets/left_arrow.png";
import icon from "../../assets/logo_2.png";
// import password_icon from "../../assets/password_icon.png"; // Fixed typo in filename
import { Link } from "react-router-dom";
import { resetPasswodMutation } from "./https/chenge-password"; // Fixed typos in import

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Added to compare passwords
  } = useForm();

  const { mutate, isPending } = resetPasswodMutation();

  const password = watch("password");
  const token = localStorage.getItem("passwordChangeToken");

  const onSubmit = async (data) => {
    const newData = {
      newPassword: data.password,
      confirmPassword: data.newpassword,
      token: token,
    };

    try {
      mutate(newData);
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

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
            <img src={icon} alt="Logo" /> {/* Added alt text */}
          </div>

          {/* Form */}
          <div className="flex items-center">
            <img className="w-4 mr-2" src={arrow} alt="Back arrow" />{" "}
            {/* Added margin and alt text */}
            <Link to="/sign-in" className="text-xs">
              Back to login
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-4">Reset Password</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1 font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 p-2 rounded-md pr-10" // Added padding-right for icon
                />
                <img
                  // src={password_icon}
                  alt="Password icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1 font-semibold">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("newpassword", {
                    required: "Password confirmation is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 p-2 rounded-md pr-10" // Added padding-right for icon
                />
                <img
                  // src={password_icon}
                  alt="Password icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              </div>
              {errors.newpassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newpassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending} // Disable button when submitting
              className={`w-full bg-[#7F0284] text-white p-3 rounded-md font-semibold mt-6 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
