import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useGetAllUteList } from "./https/useGetAllUteList";

const ShipmentTable = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { data, isLoading } = useGetAllUteList({ page: 1, limit: 10 });

  console.log(data);

  const onSubmit = (data) => {
    if (editingId !== null) {
      setFaqs((prev) =>
        prev.map((faq) => (faq.id === editingId ? { ...faq, ...data } : faq))
      );
    } else {
      const newFaq = { id: String(Date.now()), ...data };
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
      Object.entries(faq).forEach(([key, value]) => {
        setValue(key, value);
      });
      setEditingId(id);
      setAddModalOpen(true);
    }
  };

  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 sm:mb-0">Ute List</h1>
        <button
          className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] font-semibold py-2 px-4 rounded-md transition-colors"
          onClick={() => setAddModalOpen(true)}
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#7F0284] text-white">
              {[
                "Full Name",
                "Description",
                "Licence No.",
                "Expiry Date",
                "Service Cities",
                "Location",
                "UTE Model",
                "Chassis No.",
                "Availability",
                "Budget",
                "Image",
                "Actions",
              ].map((heading, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.length > 0 ? (
              data?.data?.map((faq) => (
                <tr key={faq.id} className="border-t">
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.fullName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.description}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.licenceNumber}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.licenceExpireDate}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.serviceCity}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.location}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.uteModel}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.chesisNumber}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.uteAvailble}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    ${faq?.budget}
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={faq?.image}
                      alt="UTE"
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 flex space-x-2 whitespace-nowrap">
                    <FaEdit
                      onClick={() => handleEditFaq(faq?.id)}
                      className="text-[#7F0284] text-xl md:text-2xl cursor-pointer hover:opacity-75"
                    />
                    <AiFillDelete
                      onClick={() => handleDeleteFaq(faq?.id)}
                      className="text-red-600 text-xl md:text-2xl cursor-pointer hover:opacity-75"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <div>No Ute List</div>
            )}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              {editingId !== null ? "Edit User" : "Add New User"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {[
                { name: "fullName", label: "Full Name", type: "text" },
                { name: "description", label: "Description", type: "textarea" },
                {
                  name: "licenceNumber",
                  label: "Licence Number",
                  type: "text",
                },
                {
                  name: "licenceExpireDate",
                  label: "Expiry Date",
                  type: "date",
                },
                { name: "serviceCity", label: "Service Cities", type: "text" },
                { name: "location", label: "Location", type: "text" },
                { name: "uteModel", label: "UTE Model", type: "text" },
                {
                  name: "chassisNumber",
                  label: "Chassis Number",
                  type: "text",
                },
                { name: "uteAvailable", label: "Availability", type: "text" },
                { name: "budget", label: "Budget", type: "number" },
              ].map((field) => (
                <div key={field.name}>
                  {field.type === "textarea" ? (
                    <textarea
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7F0284]"
                      {...register(field.name, {
                        required: `${field.label} is required`,
                      })}
                      placeholder={`Enter ${field.label}`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7F0284]"
                      {...register(field.name, {
                        required: `${field.label} is required`,
                      })}
                      placeholder={`Enter ${field.label}`}
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}
              <input
                type="file"
                className="w-full p-2 border rounded"
                onChange={handleImageChange}
              />
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="submit"
                  className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] py-2 px-4 rounded transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
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

export default ShipmentTable;
