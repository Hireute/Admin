import Modal from "react-modal";
import { ImCross } from "react-icons/im";

const CommonModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      className="top-1/2 left-1/2 md:p-5 p-3 lg:w-[45%] w-[75%] sm:ml-0 ml-14  translate-y-[10%] bg-white rounded-lg shadow-lg overflow-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-[#BFA75D]"
      >
        <ImCross />
      </button>
      {children}
    </Modal>
  );
};

export default CommonModal;
