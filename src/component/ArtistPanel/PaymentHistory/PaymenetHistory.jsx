import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";

const initialFAQs = [
  {
    id: "1",
    userName: "John Doe",
    uteName: "Heavy-duty UTE for transportation",
    uteModel: "Toyota Hilux",
    location: "California",
    uteModel: "Toyota Hilux",
    utePrice: "20000",
    paymentStatus: "Completed",
    image:
      "https://t3.ftcdn.net/jpg/04/08/39/96/240_F_408399601_CeSyb7MWr5FQvYX0kpv3lzftPqoB5iZ7.jpg",
  },
  {
    id: "2",

    userName: "John Do2",
    uteName: "Heavy-duty UTE for transportation",
    uteModel: "Toyota Hilux",
    location: "California",
    uteModel: "Toyota Hilux",
    utePrice: "20000",
    paymentStatus: "Pending",
    image:
      "https://t4.ftcdn.net/jpg/06/78/70/79/240_F_678707990_yylMmrDEp54HeHaJMcjWqSr0T7AOHy2I.jpg",
  },
];

const PaymenetHistory = () => {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newImage, setNewImage] = useState(null);
  console.log("newImagenewImagenewImage", newImage);

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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(URL.createObjectURL(file));
    }
  };
  const handleEditFaq = (id) => {
    const faq = faqs.find((faq) => faq.id === id);
    if (faq) {
      setValue("userName", faq.userName);
      setValue("uteName", faq.uteName);
      setValue("uteModel", faq.uteModel);
      setValue("location", faq.location);
      setValue("paymentStatus", faq.paymentStatus);
      setValue("utePrice", faq.utePrice);
      setValue("image", newImage || "https://via.placeholder.com/100");
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
        <h1 className="text-2xl font-bold">Payment History</h1>
        <button
          className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284]  font-semibold py-2 px-4 rounded-md"
          onClick={() => setAddModalOpen(true)}
        >
          Add Payment Details
        </button>
      </div>

      <table className="w-full border bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-[#7F0284] text-white">
            {[
              "User Name",
              "uteName",
              "uteModel",
              "location",
              "Ute Price",
              "paymentStatus",
              "ute image",
              "Actions",
            ].map((heading, index) => (
              <th key={index} className="px-4 py-3 whitespace-nowrap">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id} className="border-t text-center">
              <td className="p-2">{faq.userName}</td>
              <td className="p-2">{faq.uteName}</td>
              <td className="p-2">{faq.uteModel}</td>
              <td className="p-2">{faq.location}</td>
              <td className="p-2">{faq.utePrice}</td>
              <td className="p-2">{faq.paymentStatus}</td>
              <td className="p-2">
                <img
                  src={faq.image}
                  alt="Blog"
                  className="w-16 h-16 object-cover rounded"
                />
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
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            style={{ overflow: "auto", height: "500px" }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingId !== null ? "Edit Payment Detail" : "Add a New User"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("userName", { required: "Username is required" })}
                placeholder="Enter username"
              />
              {errors.fullName && (
                <div className="text-red-500">{errors.fullName.message}</div>
              )}
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("uteName", {
                  required: "Ute name is required",
                })}
                placeholder="Enter ute name"
              />
              {errors.uteName && (
                <div className="text-red-500">{errors.uteName.message}</div>
              )}
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("uteModel", {
                  required: "Ute model is required",
                })}
                placeholder="Enter ute model  "
              />
              {errors.uteModel && (
                <div className="text-red-500">{errors.uteModel.message}</div>
              )}

              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("location", {
                  required: "Location is required",
                })}
                placeholder="Enter Location  "
              />
              {errors.location && (
                <div className="text-red-500">{errors.location.message}</div>
              )}
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  {...register("paymentStatus")}
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full relative transition duration-300 peer-checked:bg-green-500 mb-5">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform peer-checked:translate-x-6"></div>
                </div>
                <span className="ml-2 text-gray-700 mt-0">Payment Status</span>
              </label>

              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("utePrice", {
                  required: "required",
                })}
                placeholder="Enter ute price  "
              />
              {errors.utePrice && (
                <div className="text-red-500">{errors.utePrice.message}</div>
              )}
              <input
                type="file"
                className="w-full p-2 border rounded mb-3"
                onChange={handleImageChange}
              />
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

export default PaymenetHistory;
