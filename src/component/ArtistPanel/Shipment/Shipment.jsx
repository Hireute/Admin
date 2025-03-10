import { useState } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useGetAllUteList } from "./https/useGetAllUteList";
import { BASE_IMAGE_URL } from "../../utils/exports";

const ShipmentTable = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingFaq, setViewingFaq] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { data, isLoading } = useGetAllUteList({
    page: currentPage,
    limit: itemsPerPage,
  });

  const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);

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

  const handleViewFaq = (faq) => {
    setViewingFaq(faq);
    setViewModalOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <p>Loading...</p>;

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
              data.data.map((faq) => (
                <tr key={faq.id} className="border-t">
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.fullName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {faq?.description
                      ? faq.description.split(" ").slice(0, 10).join(" ") +
                        (faq.description.split(" ").length > 10 ? "..." : "")
                      : "No description"}
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
                  <td className="px-4 py-2">{faq?.uteAvailble.join(" ")}</td>

                  <td className="px-4 py-2 whitespace-nowrap">
                    ${faq?.budget}
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={`${BASE_IMAGE_URL}/uteImages/${faq?.image}`}
                      alt="UTE"
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 flex space-x-2 whitespace-nowrap">
                    <AiFillEye
                      onClick={() => handleViewFaq(faq)}
                      className="text-blue-600 text-xl md:text-2xl cursor-pointer hover:opacity-75"
                    />
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
              <tr>
                <td colSpan="12" className="text-center py-4">
                  No Ute List
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-[#7F0284] text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 ${
                currentPage === page
                  ? "bg-[#7F0284] text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-[#7F0284] text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

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

      {/* View Details Modal */}
      {isViewModalOpen && viewingFaq && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              UTE Details
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Full Name:</strong> {viewingFaq?.fullName}
              </p>
              <p>
                <strong>Description:</strong> {viewingFaq?.description}
              </p>
              <p>
                <strong>Licence Number:</strong> {viewingFaq?.licenceNumber}
              </p>
              <p>
                <strong>Expiry Date:</strong> {viewingFaq?.licenceExpireDate}
              </p>
              <p>
                <strong>Service Cities:</strong> {viewingFaq?.serviceCity}
              </p>
              <p>
                <strong>Location:</strong> {viewingFaq?.location}
              </p>
              <p>
                <strong>UTE Model:</strong> {viewingFaq?.uteModel}
              </p>
              <p>
                <strong>Chassis Number:</strong> {viewingFaq?.chesisNumber}
              </p>
              <p>
                <strong>Availability:</strong> {viewingFaq?.uteAvailble}
              </p>
              <p>
                <strong>Budget:</strong> ${viewingFaq?.budget}
              </p>
              <img
                src={`${BASE_IMAGE_URL}/uteImages/${viewingFaq?.image}`}
                alt="UTE"
                className="w-full max-w-[200px] object-cover rounded"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentTable;
