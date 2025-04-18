import React from "react";
import logo from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  // const isAuthorized = useSelector((state)=> state.user.isAuthorized)

  // const userName = useSelector((state)=> state.user.user.firstName)
  // const lastName = useSelector((state)=> state.user.user.lastName)


  // console.log(userName)
  const redirectToHome = () => {
    navigate("/");
  };
  
  return (
    <div className="mx-auto bg-slate-50">
      <div
        className="flex gap-10 items-center justify-between py-3 flex-row w-full"
        style={{ borderBottom: "8px solid #7F0284" }}
      >
        <div className="w-[25%] font-normal px-9">
          <img src={logo} alt="Logo" onClick={redirectToHome} className="cursor-pointer" />
        </div>

        <div className="flex items-center gap-3 pr-9">
          {/* <span className="text-gray-700 font-medium">{userName + " " + lastName}</span>  */}
          <FaUserCircle className="text-3xl text-purple-800 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;