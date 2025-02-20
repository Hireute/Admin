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

const initialBlogs = [
  {
    id: 1,
    title: "What is React?",
    description: "React is a JavaScript library for building UI.",
    postedAt: new Date().toLocaleDateString(),
    views: 120,
    comments: 5,
    image: "https://via.placeholder.com/100",
    user: "John Doe",
  },
  {
    id: 2,
    title: "What is TypeScript?",
    description: "TypeScript is a strongly typed superset of JavaScript.",
    postedAt: new Date().toLocaleDateString(),
    views: 90,
    comments: 3,
    image: "https://via.placeholder.com/100",
    user: "Jane Smith",
  },
];

const BlogPost = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newUser, setNewUser] = useState("");
  const [newViews, setNewViews] = useState(0);
  const [newComments, setNewComments] = useState(0);
  const [editingId, setEditingId] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveBlog = () => {
    if (editingId !== null) {
      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === editingId
            ? {
                ...blog,
                title: newTitle,
                description: newDescription,
                image: newImage,
                user: newUser,
                views: newViews,
                comments: newComments,
              }
            : blog
        )
      );
    } else {
      const newBlog = {
        id: Date.now(),
        title: newTitle,
        description: newDescription,
        postedAt: new Date().toLocaleDateString(),
        views: newViews,
        comments: newComments,
        image: newImage || "https://via.placeholder.com/100",
        user: newUser || "Anonymous",
      };
      setBlogs([...blogs, newBlog]);
    }
    setNewTitle("");
    setNewDescription("");
    setNewImage(null);
    setNewUser("");
    setNewViews(0);
    setNewComments(0);
    setEditingId(null);
    setModalOpen(false);
  };

  const handleEditBlog = () => {
    setModalOpen(true);
    const blog = blogs.find((blog) => blog.id === id);

    if (blog) {
      setNewTitle(blog.title);
      setNewDescription(blog.description);
      setNewImage(blog.image);
      setNewUser(blog.user);
      setNewViews(blog.views);
      setNewComments(blog.comments);
      setEditingId(id);
      console.log("Opening modal for blog ID:", id); // Debugging ke liye
    }
  };

  return (
    <div className="w-full p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs List</h1>
        <button
          className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] font-semibold py-2 px-4 rounded-md"
          onClick={() => setModalOpen(true)}
        >
          Add Blog
        </button>
      </div>

      <table className="w-full border-collapse border bg-white shadow-md border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-[#7F0284] text-white">
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Posted At</th>
            <th className="p-2">Number of views</th>
            <th className="p-2">Number of comments</th>
            <th className="p-2">Blog image</th>
            <th className="p-2">Blog user</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className="border-t border-gray-300 text-center">
              <td className="p-2">{blog.title}</td>
              <td className="p-2">{blog.description}</td>
              <td className="p-2">{blog.postedAt}</td>
              <td className="p-2">{blog.views}</td>
              <td className="p-2">{blog.comments}</td>
              <td className="p-2">
                <img
                  src={blog.image}
                  alt="Blog"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-2">{blog.user}</td>
              <td className="p-2 flex justify-center space-x-2">
                <FaEdit
                  onClick={() => handleEditBlog(blog.id)}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                />
                <AiFillDelete
                  onClick={() =>
                    setBlogs(blogs.filter((b) => b.id !== blog.id))
                  }
                  className="text-red-600 hover:text-red-800 cursor-pointer text-xl"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingId !== null ? "Edit Blog" : "Add a New Blog"}
            </h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-3"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter Title"
            />
            <textarea
              className="w-full p-2 border rounded mb-3"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter Description"
            ></textarea>
            <input
              type="file"
              className="w-full p-2 border rounded mb-3"
              onChange={handleImageChange}
            />
            <input
              type="text"
              className="w-full p-2 border rounded mb-3"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              placeholder="Enter User Name"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleSaveBlog}
                className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
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

export default BlogPost;
