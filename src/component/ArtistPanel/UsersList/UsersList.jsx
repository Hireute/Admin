import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllUserList } from "./https/useGetAllUserList";
import useActiveMutation from "./https/useActiveMutation";
import Loader from "../../utils/Loader";
import { AiFillDelete } from "react-icons/ai"; // Added delete icon import
import useDeleteUser from "./https/useDeleteUser";

const initialFAQs = [
  {
    id: 1,
    name: "Shikha Jatav",
    address: "344 patnipura indore",
    email: "shikha@gmail.com",
    mobileNumber: "653344555",
    active: true,
  },
  {
    id: 2,
    name: "Ishant Jatav",
    address: "555 patnipura indore",
    email: "ishnat@gmail.com",
    mobileNumber: "66446666",
    active: false,
  },
];

const UsersList = () => {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { data, isLoading } = useGetAllUserList({ page: currentPage, limit });
  console.log(data);

  const { mutateAsync } = useActiveMutation();

  const handleActiveToggle = (id, currentStatus) => {
    const newData = {
      id: id,
      isActive: currentStatus ? "inactive" : "active",
    };
    setPendingId(id);
    mutateAsync(newData)
      .then(() => {
        setFaqs((prev) =>
          prev.map((faq) =>
            faq.id === id ? { ...faq, active: !currentStatus } : faq
          )
        );
      })
      .finally(() => {
        setPendingId(null);
      });
    setEditingId(null);
  };

  const {mutate} = useDeleteUser()
  const handleDeleteUser = (id) => {
    mutate(id)
   
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
  };

  const filteredUsers = data?.data?.filter((faq) =>
    faq?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-6 rounded-lg">
      <div className="flex gap-6 justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users List</h1>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-[50vw] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7F0284]"
          />
        </div>
      </div>

      <table className="w-full border bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-[#7F0284] text-white">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Address</th>
            <th className="p-2">Mobile Number</th>
            <th className="p-2">Created Date</th> {/* Added Created Date */}
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.length > 0 ? (
            filteredUsers.map((faq) => (
              <tr key={faq.id} className="border-t text-center">
                <td className="p-2">{faq?.firstName + " " + faq?.lastName}</td>
                <td className="p-2">{faq?.email}</td>
                <td className="p-2">{faq?.address}</td>
                <td className="p-2">{faq?.phoneNumber}</td>
                <td className="p-2">{formatDate(faq?.createdAt)}</td> {/* Added Created Date */}
                <td className="p-2">
                  <span
                    className={
                      faq?.isActive ? "text-green-600" : "text-red-600"
                    }
                  >
                    {faq?.isActive === true ? "Active" : "Deactive"}
                  </span>
                </td>
                <td className="p-2 flex justify-center gap-2 items-center">
                  <button
                    className={`text-white text-sm rounded-md transition duration-200 ${
                      faq?.isActive
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    onClick={() => handleActiveToggle(faq._id, faq?.isActive)}
                    style={{ padding: "5px 14px" }}
                    disabled={pendingId === faq._id}
                  >
                    {pendingId === faq._id
                      ? "Processing..."
                      : faq?.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                  <AiFillDelete
                    className="text-red-600 cursor-pointer text-xl hover:text-red-800"
                    onClick={() => handleDeleteUser(faq._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-2 text-center">
                {searchTerm ? "No matching users found" : "No Users Yet"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-[#7F0284] text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-[#7F0284] text-white"
                  : "bg-gray-200 text-[#7F0284]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-[#7F0284] text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersList;