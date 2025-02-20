import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";

const initialFAQs = [
  {
    id: "1",
    userName: "John Doe",
    uteName: "Toyota Hilux",
    uteModel: "XKOW3903",
    price: "20000",
    location: "California",
    bookingTime: "2025-03-15T10:00:00Z",
    uteImage: "https://example.com/image.jpg",
  },
  {
    id: "2",
    userName: "Merry Doe",
    uteName: "Toyota Hilux",
    uteModel: "XKOUYT3903",
    price: "20000",
    location: "California",
    bookingTime: "2025-03-15T10:00:00Z",
    uteImage: "https://example.com/image.jpg",
  },
];

const BookinList = () => {
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
      setValue("price", faq.price);
      setValue("location", faq.location);
      setValue("bookingTime", faq.bookingTime);
      setValue("uteImage", newImage || "https://via.placeholder.com/100");
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
        <h1 className="text-2xl font-bold">All Bookings</h1>
        <button
          className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284]  font-semibold py-2 px-4 rounded-md"
          onClick={() => setAddModalOpen(true)}
        >
          Add Booking
        </button>
      </div>

      <table className="w-full border bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-[#7F0284] text-white">
            {[
              "User Name",
              "Ute Name",
              "Ute Model",
              "Price",
              "Booking Time",
              "Location",
              "Ute Image",
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
              <td className="p-2">{faq.price}</td>
              <td className="p-2">{faq.bookingTime}</td>
              <td className="p-2">{faq.location}</td>

              <td className="p-2">
                <img
                  src={faq.uteImage}
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
            style={{ overflow: "auto", height: "600px" }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingId !== null
                ? "Edit Booking Detail"
                : "Add a New Booking "}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("userName", { required: "Username is required" })}
                placeholder="Enter username"
              />
              {errors.userName && (
                <div className="text-red-500">{errors.userName.message}</div>
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
                type="price"
                className="w-full p-2 border rounded mb-3"
                {...register("price", {
                  required: "Price is required",
                })}
                placeholder="Enter Location  "
              />
              {errors.price && (
                <div className="text-red-500">{errors.price.message}</div>
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
                type="date"
                className="w-full p-2 border rounded mb-3"
                {...register("bookingTime", {
                  required: "Booking time is required",
                })}
                placeholder="Enter Booking time  "
              />
              {errors.bookingTime && (
                <div className="text-red-500">{errors.bookingTime.message}</div>
              )}

              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("location", {
                  required: "required",
                })}
                placeholder="Enter ute location  "
              />
              {errors.location && (
                <div className="text-red-500">{errors.location.message}</div>
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

export default BookinList;
