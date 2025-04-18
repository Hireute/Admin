import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { usePostFaqMutation } from "./https/usePostFaqMutation";
import { useGetFaqList } from "./https/useGetFaqList";
import { useUpdateFaqMutation } from "./https/useUpdateFaqMutation";
import { useDeleteFaqMutation } from "./https/useDeleteFaqMutation";
import Loader from "../../utils/Loader";

const FaqForm = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);

  const { mutateAsync: postFaq, isPending: isPostPending } =
    usePostFaqMutation();
  const { mutateAsync: updateFaq, isPending: isUpdatePending } =
    useUpdateFaqMutation();

  const { mutateAsync: deleteFaq, isPending: deletePending } =
    useDeleteFaqMutation();
  const { data, isLoading } = useGetFaqList();

  const handleAddFaq = () => {
    if (isPostPending) return;

    const newData = {
      question: newQuestion,
      answer: newAnswer,
    };

    postFaq(newData)
      .then(() => {
        setNewQuestion("");
        setNewAnswer("");
        setAddModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding FAQ:", error);
      });
  };

  const handleUpdateFaq = () => {
    if (isUpdatePending || !editingId) return;

    const updateData = {
      id: editingId,
      question: editQuestion,
      answer: editAnswer,
    };

    updateFaq(updateData)
      .then(() => {
        setEditQuestion("");
        setEditAnswer("");
        setEditingId(null);
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating FAQ:", error);
      });
  };

  const handleEditFaq = (id) => {
    const faq = data?.find((faq) => faq._id === id);

    console.log(faq);
    if (faq) {
      setEditQuestion(faq.question);
      setEditAnswer(faq.answer);
      setEditingId(id);
      setEditModalOpen(true);
    }
  };

  const handleDeleteFaq = (id) => {
    deleteFaq(id);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        <button
          className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] font-semibold py-2 px-4 rounded-md"
          onClick={() => setAddModalOpen(true)}
        >
          Add FAQ
        </button>
      </div>

      <table className="w-full border-collapse border bg-white shadow-md border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-[#7F0284] text-white">
            <th className="p-2">Question</th>
            <th className="p-2">Answer</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((faq) => (
              <tr key={faq.id} className="border-t border-gray-300 text-center">
                <td className="p-2">{faq.question}</td>
                <td className="p-2">{faq.answer}</td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEditFaq(faq._id)}
                    className="text-[#7F0284] hover:text-[#FEE0FF] text-2xl"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(faq._id)}
                    className="text-red-600 hover:text-red-800 text-2xl"
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-2 text-center">
                No FAQs
              </td>
            </tr>
          )}
        </tbody>
      </table>


      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add a New FAQ</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-3"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter Question"
            />
            <textarea
              className="w-full p-2 border rounded mb-3"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Enter Answer"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleAddFaq}
                disabled={isPostPending}
                className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] py-2 px-4 rounded disabled:opacity-50"
              >
                {isPostPending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setNewQuestion("");
                  setNewAnswer("");
                  setAddModalOpen(false);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit FAQ</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-3"
              value={editQuestion}
              onChange={(e) => setEditQuestion(e.target.value)}
              placeholder="Enter Question"
            />
            <textarea
              className="w-full p-2 border rounded mb-3"
              value={editAnswer}
              onChange={(e) => setEditAnswer(e.target.value)}
              placeholder="Enter Answer"
              rows={8}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleUpdateFaq}
                disabled={isUpdatePending}
                className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] py-2 px-4 rounded disabled:opacity-50"
              >
                {isUpdatePending ? "Updating..." : "Update"}
              </button>
              <button
                onClick={() => {
                  setEditQuestion("");
                  setEditAnswer("");
                  setEditingId(null);
                  setEditModalOpen(false);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqForm;
