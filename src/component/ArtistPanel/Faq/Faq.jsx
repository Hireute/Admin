// import React, { useState, useEffect } from "react";
// import DeleteModal from "../../utils/DeleteModal";
// import FAQList from "./FaqList";
// import FAQModal from "./FaqModal";
// import { PostFaqMutation } from "./https/postfaqmutation";
// import { useSelector } from "react-redux";
// import { GetFaqList } from "./https/Getfaqlist";
// import LoadingPage from "../../Loader";
// import { DeleteFaq } from "./https/deletefaqs";
// import { EditFaq } from "./https/updategaq";

// const FaqForm = () => {
//   const { token } = useSelector((state) => state.user);
//   const [faqs, setFaqs] = useState([]);
//   const [newQuestion, setNewQuestion] = useState("");
//   const [newAnswer, setNewAnswer] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [isAddModalOpen, setAddModalOpen] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [toggledIndex, setToggledIndex] = useState(null);
//   const [isEdit, setIsEdit] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const { mutateAsync: postfaqmutation, isPending: postPending } =
//     PostFaqMutation();
//   const { mutateAsync: deleteFaq } = DeleteFaq();
//   const { mutateAsync: update } = EditFaq();
//   const { data, isLoading, isError, error } = GetFaqList({ token });

//   useEffect(() => {
//     if (data) {
//       setFaqs(data);
//     }
//   }, [data]);

//   // useEffect(() => {
//   //   const storedFaqs = JSON.parse(localStorage.getItem("faqs"));
//   //   if (storedFaqs) {
//   //     setFaqs(storedFaqs);
//   //   }
//   // }, []);

//   useEffect(() => {
//     localStorage.setItem("faqs", JSON.stringify(faqs));
//   }, [faqs]);

//   const toggleAccordion = (index) => {
//     setToggledIndex(index === toggledIndex ? null : index);
//   };

//   const handleSaveFaq = async () => {
//     if (newQuestion && newAnswer && !isEdit) {
//       try {
//         const faqSaveData = { question: newQuestion, answer: newAnswer };
//         faqSaveData.token = token;
//         await postfaqmutation(faqSaveData);
//       } catch (error) {
//         throw error;
//       }
//       setNewQuestion("");
//       setNewAnswer("");
//       setEditingIndex(null);
//       setAddModalOpen(false);
//     } else {
//       try {
//         const faqUpdateSaveData = { question: newQuestion, answer: newAnswer };
//         faqUpdateSaveData.token = token;
//         faqUpdateSaveData.id = editId;
//         await update(faqUpdateSaveData);
//       } catch (error) {
//         throw error;
//       }
//       setNewQuestion("");
//       setNewAnswer("");
//       setEditingIndex(null);
//       setAddModalOpen(false);
//       setEditId(null);
//       setIsEdit(false);
//     }
//   };

//   const handleOpenEditForm = (id, index) => {
//     setNewQuestion(faqs[index].question);
//     setNewAnswer(faqs[index].answer);
//     setEditingIndex(index);
//     setEditId(id);
//     setIsEdit(true);
//     setAddModalOpen(true);
//   };

//   const handleOpenDeleteModal = (id) => {
//     setDeleteIndex(id);
//     setDeleteModalOpen(true);
//   };

//   const confirmDeleteFaq = async () => {
//     await deleteFaq({ id: deleteIndex, token });
//     setDeleteModalOpen(false);
//     setDeleteIndex(null);
//   };

//   const handleReset = () => {
//     setNewQuestion("");
//     setNewAnswer("");
//     setEditingIndex(null);
//     setAddModalOpen(true);
//     setEditId(null);
//     setIsEdit(false);
//   };

//   // if (isLoading) {
//   //   return <LoadingPage />;
//   // }
//   // if (isError) {
//   //   return <p>{error?.response?.data?.message}</p>;
//   // }

//   return (
//     <div className="mx-auto ">
//       <div className="flex sm:flex-row flex-col justify-between items-center gap-2 mb-10">
//         <h1 className="text-2xl font-semibold">Frequently Asked Questions</h1>
//         <button
//           className="text-white bg-[#BFA75D] font-medium mt-2 rounded-md text-md px-5 py-3"
//           onClick={() => handleReset()}
//         >
//           Add FAQ
//         </button>
//       </div>

//       <FAQList
//         faqs={faqs}
//         toggledIndex={toggledIndex}
//         toggleAccordion={toggleAccordion}
//         onEdit={handleOpenEditForm}
//         setEditId={setEditId}
//         onDelete={handleOpenDeleteModal}
//       />

//       {isAddModalOpen && (
//         <FAQModal
//           title={editingIndex !== null ? "Edit FAQ" : "Add a New FAQ"}
//           question={newQuestion}
//           answer={newAnswer}
//           setQuestion={setNewQuestion}
//           setAnswer={setNewAnswer}
//           onSave={handleSaveFaq}
//           onClose={() => setAddModalOpen(false)}
//         />
//       )}

//       {isDeleteModalOpen && (
//         <DeleteModal
//           title="Confirm Delete"
//           onClose={() => setDeleteModalOpen(false)}
//           onConfirm={confirmDeleteFaq}
//         >
//           <p>Are you sure you want to delete this item?</p>
//         </DeleteModal>
//       )}
//     </div>
//   );
// };

// export default FaqForm;
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
const initialFAQs = [
  {
    id: 1,
    question: "What is React?",
    answer: "React is a JavaScript library for building UI.",
  },
  {
    id: 2,
    question: "What is TypeScript?",
    answer: "TypeScript is a strongly typed superset of JavaScript.",
  },
];

const FaqForm = () => {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSaveFaq = () => {
    if (editingId !== null) {
      setFaqs((prev) =>
        prev.map((faq) =>
          faq.id === editingId
            ? { ...faq, question: newQuestion, answer: newAnswer }
            : faq
        )
      );
    } else {
      const newFaq = {
        id: Date.now(),
        question: newQuestion,
        answer: newAnswer,
      };
      setFaqs([...faqs, newFaq]);
    }
    setNewQuestion("");
    setNewAnswer("");
    setEditingId(null);
    setAddModalOpen(false);
  };

  const handleEditFaq = (id) => {
    const faq = faqs.find((faq) => faq.id === id);
    if (faq) {
      setNewQuestion(faq.question);
      setNewAnswer(faq.answer);
      setEditingId(id);
      setAddModalOpen(true);
    }
  };

  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  return (
    <div className="w-full  p-6  rounded-lg">
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
            <th className=" p-2">Question</th>
            <th className="  p-2">Answer</th>
            <th className=" p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr
              key={faq.id}
              className=" border-t border-gray-300-gray-300 text-center"
            >
              <td className="  p-2">{faq.question}</td>
              <td className="  p-2">{faq.answer}</td>
              <td className="  p-2 flex ">
                <FaEdit
                  onClick={() => handleEditFaq(faq.id)}
                  className="text-[#7F0284] hover:underline text-2xl mr-2 w-full"
                />
                <AiFillDelete
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="text-red-600 hover:underline text-2xl w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingId !== null ? "Edit FAQ" : "Add a New FAQ"}
            </h2>
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
            ></textarea>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleSaveFaq}
                className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setAddModalOpen(false)}
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
