import React from "react";

const FAQModal = ({
  title,
  question,
  answer,
  setQuestion,
  setAnswer,
  onSave,
  onClose,
}) => {
  const handleClickOutside = (e) => {
    // if (e.target.id === "modalOverlay") {
    //   onClose();
    // }
  };

  return (
    <div
      // id="modalOverlay"
      onClick={handleClickOutside}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg md:p-6 p-3 w-full md:max-w-xl max-w-xs sm:ml-0 ml-10">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Answer
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onSave}
            className="bg-[#BFA75D] text-white px-4 py-2 rounded font-medium"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQModal;
