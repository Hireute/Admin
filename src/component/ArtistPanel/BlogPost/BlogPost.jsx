import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { usePostBlogMutation } from "./https/usePostBlogMutation";
import { useUpdateBLogMutation } from "./https/useUpdateBLogMutation";
import { useGetBlogList } from "./https/useGetBlogList";
import Loader from "../../utils/Loader";
import { useDeleteBlogMutation } from "./https/useDeleteBlogMutation";
import { BASE_IMAGE_URL } from "../../utils/exports";

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
  const [isModalEditOpen, setModalEditOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newUser, setNewUser] = useState("");
  const [newViews, setNewViews] = useState(0);
  const [newComments, setNewComments] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [file, setfile] = useState(null);

  const { mutateAsync, isPending } = usePostBlogMutation();
  const { mutateAsync: updateBlog, isPending: updatePending } =
    useUpdateBLogMutation();

  const { mutateAsync: deleteBlog, isPending: deletePending } =
    useDeleteBlogMutation();

  const { data, isLoading } = useGetBlogList();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setfile(file);
      setNewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveBlog = () => {
    const formData = new FormData();

    formData.append("title", newTitle);
    formData.append("description", newDescription);
    formData.append("blogImg", file);
    formData.append("user", newUser);
    formData.append("views", newViews);
    formData.append("comments", newComments);

    mutateAsync(formData).then(() => {
      setNewTitle("");
      setNewDescription("");
      setNewImage(null);
      setNewUser("");
      setNewViews(0);
      setNewComments(0);
      setEditingId(null);
      setModalOpen(false);
    });
  };

  const handleEditBlog = (id) => {
    setModalEditOpen(true);
    const blog = data?.find((blog) => blog._id === id);

    if (blog) {
      setNewTitle(blog.title);
      setNewDescription(blog.description);
      setNewImage(blog.image);
      setNewUser(blog.user);
      setNewViews(blog.views);
      setNewComments(blog.comments);
      setEditingId(blog._id);
      console.log("Opening modal for blog ID:", id);
    }
  };

  const handleUpdateBlog = () => {
    console.log("ndsjkn");
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("description", newDescription);
    formData.append("blogImg", file);
    formData.append("user", newUser);
    formData.append("views", newViews);
    formData.append("comments", newComments);

    const newData = {
      id: editingId,
      formData: formData,
    };

    updateBlog(newData).then(() => {
      setEditingId(null);
      setModalEditOpen(false);
    });
  };

  const handleDeleteBlog = (id) => {
    deleteBlog(id);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-4 md:p-6 rounded-lg overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Blogs List</h1>
        <button
          className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] font-semibold py-2 px-4 rounded-md w-full md:w-auto"
          onClick={() => setModalOpen(true)}
        >
          Add Blog
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border bg-white shadow-md border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-[#7F0284] text-white">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left hidden sm:table-cell">Description</th>
              <th className="p-2 text-left hidden md:table-cell">Posted At</th>
              <th className="p-2 text-left hidden lg:table-cell">Views</th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left hidden xl:table-cell">User</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((blog) => (
              <tr key={blog.id} className="border-t border-gray-300">
                <td className="p-2">{blog?.title}</td>
                <td className="p-2 hidden sm:table-cell">
                  {blog?.description
                    ? blog.description.split(" ").slice(0, 25).join(" ") +
                      (blog.description.split(" ").length > 25 ? "..." : "")
                    : "No description"}
                </td>
                <td className="p-2 hidden md:table-cell">
                  {blog?.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "No date"}
                </td>
                <td className="p-2 hidden lg:table-cell">{blog?.views}</td>
                <td className="p-2">
                  <img
                    src={`${BASE_IMAGE_URL}/blogImg/${blog.blogImg[0]}`}
                    alt="Blog"
                    className="w-10 h-10 md:w-16 md:h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 hidden xl:table-cell">{blog?.user}</td>
                <td className="p-2 flex justify-start space-x-2">
                  <FaEdit
                    onClick={() => handleEditBlog(blog?._id)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                  />
                  <AiFillDelete
                    onClick={() => handleDeleteBlog(blog?._id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer text-xl"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(isModalOpen || isModalEditOpen) && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
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
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={isModalEditOpen ? handleUpdateBlog : handleSaveBlog}
                className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] py-2 px-4 rounded"
              >
                {isPending
                  ? "Saving..."
                  : updatePending
                  ? "Updating..."
                  : isModalEditOpen
                  ? "Update"
                  : "Save"}
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setModalEditOpen(false);
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

export default BlogPost;