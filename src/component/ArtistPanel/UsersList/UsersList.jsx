import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";

const initialFAQs = [
  {
    id: 1,
    name: "Shikha Jatav",
    address: "344 patnipura indore",
    email: "shikha@gmail.com",
    mobileNumber: "653344555",
  },
  {
    id: 2,
    name: "Ishant Jatav",
    address: "555 patnipura indore",
    email: "ishnat@gmail.com",
    mobileNumber: "66446666",
  },
];

const UsersList = () => {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (editingId !== null) {
      setFaqs((prev) =>
        prev.map((faq) => (faq.id === editingId ? { ...faq, ...data } : faq))
      );
    } else {
      const newFaq = { id: Date.now(), ...data };
      setFaqs([...faqs, newFaq]);
    }
    reset();
    setEditingId(null);
    setAddModalOpen(false);
  };

  const handleEditFaq = (id) => {
    const faq = faqs.find((faq) => faq.id === id);
    if (faq) {
      setValue("name", faq.name);
      setValue("address", faq.address);
      setValue("email", faq.email);
      setValue("mobileNumber", faq.mobileNumber);
      setEditingId(id);
      setAddModalOpen(true);
    }
  };

  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  return (
    <div className="w-full p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users List</h1>
        <button
          className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284]  font-semibold py-2 px-4 rounded-md"
          onClick={() => setAddModalOpen(true)}
        >
          Add User
        </button>
      </div>

      <table className="w-full border bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-[#7F0284] text-white">
            <th className="p-2">name</th>
            <th className="p-2">email</th>
            <th className="p-2">address</th>
            <th className="p-2">mobileNumber</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id} className="border-t text-center">
              <td className="p-2">{faq.name}</td>
              <td className="p-2">{faq.email}</td>
              <td className="p-2">{faq.address}</td>
              <td className="p-2">{faq.mobileNumber}</td>
              <td className="p-2 gap-2 mt-3">
                <button
                  className=" bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition duration-200"
                  // onClick={() => handleAcceptQuote(request._id)}
                  style={{ padding: "5px 14px" }}
                >
                  Accept
                </button>
                <button
                  className=" bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition duration-200 ml-4"
                  onClick={() => {
                    handleDeleteFaq(faq.id);
                    // setShowConfirmModal(true);
                  }}
                  style={{ padding: "5px 14px" }}
                >
                  Reject
                </button>
              </td>
              <td className="p-2 flex justify-center">
                <FaEdit
                  onClick={() => handleEditFaq(faq.id)}
                  className="text-[#7F0284] text-2xl mr-2 cursor-pointer"
                />
                <AiFillDelete
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="text-red-600 text-2xl cursor-pointer"
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
              {editingId !== null ? "Edit User" : "Add a New User"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter Name"
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
              <input
                type="email"
                className="w-full p-2 border rounded mb-3"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter Email"
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}

              <textarea
                className="w-full p-2 border rounded mb-3"
                {...register("address", { required: "Address is required" })}
                placeholder="Enter Address"
              ></textarea>
              {errors.address && (
                <div className="text-red-500">{errors.address.message}</div>
              )}
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("mobileNumber", {
                  required: "Mobile number is required",
                })}
                placeholder="Enter Mobile Number"
              />
              {errors.mobileNumber && (
                <div className="text-red-500">
                  {errors.mobileNumber.message}
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284]  text-white py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
