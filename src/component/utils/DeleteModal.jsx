import React from "react";
import { ImCross } from "react-icons/im";
const DeleteModal = ({ title, onClose, onConfirm, children }) => {
  const handleClickOutside = (e) => {
    if (e.target.id === "modalOverlay") {
      onClose();
    }
  };

  const handleDelete = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
    id="modalOverlay"
    className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center"
    onClick={handleClickOutside}
  >
    <div
      className="bg-white rounded-lg shadow-lg w-96 p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <ImCross size={16} color="#BFA75D"/>
        </button>
      </div>
      <div className="mb-5">{children}</div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleDelete}
          className="bg-[#BFA75D] text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>

        <button
          onClick={onClose}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  );

};

export default DeleteModal;
