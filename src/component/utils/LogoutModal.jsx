import React from "react";

const LogoutModal = ({ isModalOpen, handleModalToggle, logoutHendler }) => {
  const handleClickOutside = (e) => {
    if (e.target.id === "modalOverlay") {
      handleModalToggle();
    }
  };

  return (
    <div id="modalOverlay" onClick={handleClickOutside}>
      {isModalOpen && (
        <div
          onClick={handleClickOutside}
          id="modalOverlay"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={handleModalToggle}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-black">
                  Are you sure you want to logout?
                </h3>
                <div className="flex items-center gap-5 text-center justify-center">
                  <button
                    onClick={() => {
                      logoutHendler();
                    }}
                    className="text-white bg-[#7F0284]  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={handleModalToggle}
                    className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none rounded-lg border border-gray-200 bg-black"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutModal;
