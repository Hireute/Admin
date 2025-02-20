import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";

const initialFAQs = [
  {
    id: "1",
    fullName: "John Doe",
    description: "Heavy-duty UTE for transportation",
    licenceNumber: "XYZ123456",
    licenceExpireDate: "2025-12-31",
    serviceCity: ["New York", "Los Angeles"],
    location: "California",
    uteModel: "Toyota Hilux",
    chesisNumber: "ABC987654",
    uteAvailble: ["Monday", "Wednesday", "Friday"],
    budget: "20000",
    image:
      "https://t3.ftcdn.net/jpg/04/08/39/96/240_F_408399601_CeSyb7MWr5FQvYX0kpv3lzftPqoB5iZ7.jpg",
  },
  {
    id: "2",

    fullName: "John Do2",
    description: "Heavy-duty UTE for transportation",
    licenceNumber: "XYZ123456",
    licenceExpireDate: "2025-12-31",
    serviceCity: ["New York", "Los Angeles"],
    location: "California",
    uteModel: "Toyota Hilux",
    chesisNumber: "ABC987654",
    uteAvailble: ["Monday", "Wednesday", "Friday"],
    budget: "20000",
    image:
      "https://t4.ftcdn.net/jpg/06/78/70/79/240_F_678707990_yylMmrDEp54HeHaJMcjWqSr0T7AOHy2I.jpg",
  },
];

const JobList = () => {
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
      setValue("fullName", faq.fullName);
      setValue("description", faq.description);
      setValue("licenceNumber", faq.licenceNumber);
      setValue("licenceExpireDate", faq.licenceExpireDate);
      setValue("serviceCity", faq.serviceCity);
      setValue("location", faq.location);
      setValue("uteModel", faq.uteModel);
      setValue("chesisNumber", faq.chesisNumber);
      setValue("uteAvailble", faq.uteAvailble);
      setValue("budget", faq.budget);
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
        <h1 className="text-2xl font-bold">Jobs List</h1>
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
            {[
              "fullName",
              "description",
              "licenceNumber",
              "licenceExpireDate",
              "serviceCity",
              "location",
              "uteModel",
              "chesisNumber",
              "uteAvailble",
              "budget",
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
              <td className="p-2">{faq.fullName}</td>
              <td className="p-2">{faq.description}</td>
              <td className="p-2">{faq.licenceNumber}</td>
              <td className="p-2">{faq.licenceExpireDate}</td>
              <td className="p-2">{faq.serviceCity}</td>
              <td className="p-2">{faq.location}</td>
              <td className="p-2">{faq.uteModel}</td>
              <td className="p-2">{faq.chesisNumber}</td>
              <td className="p-2">{faq.uteAvailble}</td>
              <td className="p-2">{faq.budget}</td>
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
            style={{ overflow: "auto", height: "600px" }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingId !== null ? "Edit User" : "Add a New User"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("fullName", { required: "Name is required" })}
                placeholder="Enter Name"
              />
              {errors.fullName && (
                <div className="text-red-500">{errors.fullName.message}</div>
              )}
              <textarea
                className="w-full p-2 border rounded mb-3"
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter description"
              ></textarea>
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("licenceNumber", {
                  required: "Email is required",
                })}
                placeholder="Enter Licence Number"
              />
              {errors.licenceNumber && (
                <div className="text-red-500">
                  {errors.licenceNumber.message}
                </div>
              )}
              <input
                type="date"
                className="w-full p-2 border rounded mb-3"
                {...register("licenceExpireDate", {
                  required: "Licence ExpireDate is required",
                })}
                placeholder="Enter Licence  "
              />
              {errors.licenceExpireDate && (
                <div className="text-red-500">
                  {errors.licenceExpireDate.message}
                </div>
              )}
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("serviceCity", {
                  required: "Service city is required",
                })}
                placeholder="Enter Licence  "
              />
              {errors.serviceCity && (
                <div className="text-red-500">{errors.serviceCity.message}</div>
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
                {...register("chesisNumber", {
                  required: "Chesis number is required",
                })}
                placeholder="Enter ute model  "
              />
              {errors.chesisNumber && (
                <div className="text-red-500">
                  {errors.chesisNumber.message}
                </div>
              )}
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("uteAvailble", {
                  required: "required",
                })}
                placeholder="Enter ute available  "
              />
              {errors.uteAvailble && (
                <div className="text-red-500">{errors.uteAvailble.message}</div>
              )}{" "}
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("budget", {
                  required: "required",
                })}
                placeholder="Enter ute budget  "
              />
              {errors.budget && (
                <div className="text-red-500">{errors.budget.message}</div>
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

export default JobList;
