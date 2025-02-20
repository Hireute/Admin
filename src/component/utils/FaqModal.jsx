const FaqModal = ({ children, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white sm:p-6 p-3 rounded shadow-lg xl:w-1/3 lg:w-1/2 w-[70%] sm:ml-0 ml-10">
          {children}
          <button
            className="absolute top-2 right-2 text-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default FaqModal;
  