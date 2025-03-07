import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader relative w-16 h-16 before:content-[''] before:absolute before:w-16 before:h-16 before:border-2 before:border-t-[#8900ff] before:border-r-transparent before:rounded-full before:animate-spin"></div>
    </div>
  );
};

export default Loader;
