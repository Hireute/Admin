import React, { useEffect, useState } from "react";
// import signin from "../assets/signin.png";
import signImg from "../../assets/signin.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import email_icon from "../../assets/email_icon.png";
import logo from "../../assets/logo_2.png";
import password_icon from "../../assets/password_icon'.png";
import visible_icon from "../../assets/visible_icon.png";
import SigInInMutation from "./https/LoginMutation";
import toast from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = SigInInMutation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1((prev) => !prev);
  };
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");
      if (cookieName === name) return cookieValue;
    }
    return null;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  };

  // Load saved email from cookies if available
  useEffect(() => {
    const savedEmail = getCookie("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      if (data.remember) {
        setCookie("rememberedEmail", data.email, 30);
      } else {
        deleteCookie("rememberedEmail");
      }
      await mutateAsync(data);
    } catch (error) {}
  };

  console.log(errors);
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 relative">
        <img
          src={signImg}
          alt="Containers"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-10 left-10 text-white text-2xl xl:text-4xl font-bold ">
          <p>Your Gateway to any</p>
          <p>Destination in the World.</p>
        </div>
      </div>

      <div className="md:w-1/2 bg-[#f2f2f2] flex items-center justify-center  relative">
        <div className="max-w-md w-full px-8 mt-10 md:mt-0">
          {/* Form */}
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Sign In{" "}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1 font-semibold">
                Email
              </label>
              <div className="flex relative items-center justify-between">
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
                  className="w-full border-gray-300 p-3 rounded-md"
                />

                <div className="absolute right-2">
                  <img src={email_icon} alt="" />{" "}
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="md:w-full">
                <label className="block text-gray-700 mb-1 font-semibold">
                  Password
                </label>
                <div className="flex justify-between items-center relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
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

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-end w-full mb-4  ">
              <Link
                to="/forget-password"
                className="text-sm text-[#7F0284] md:border-b border-[#7F0284] text-right md:text-right "
              >
                Forget Password
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-[#7F0284] text-white p-3 rounded-md font-bold"
            >
              {isPending ? "...Loading" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
