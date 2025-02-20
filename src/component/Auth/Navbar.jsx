import React from "react";
import logo from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <div className=" mx-auto  bg-slate-50 ">
      <div
        className="flex gap-10  items-center justify-between py-3 flex-row w-full"
        style={{ borderBottom: "8px solid #7F0284" }}
      >
        <div className="w-[25%] font-normal px-9">
          <img src={logo} alt="Logo" onClick={redirectToHome} />
        </div>

        {/* <div className="flex lg:w-[25%] sm:w-full bg-white px-3 py-2 rounded-xl border border-gray-300 shadow-sm ">
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none text-sm ml-3 text-[#667085] font-normal"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
