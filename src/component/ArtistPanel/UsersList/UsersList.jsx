import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllUserList } from "./https/useGetAllUserList";
import useActiveMutation from "./https/useActiveMutation";
import Loader from "../../utils/Loader";
import { AiFillDelete } from "react-icons/ai";
import useDeleteUser from "./https/useDeleteUser";

const UsersList = () => {
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

  const { data, isLoading } = useGetAllUserList({ page: currentPage, limit, searchTerm });
  
  const { mutateAsync } = useActiveMutation();
  const { mutate: deleteUser } = useDeleteUser();

  const handleActiveToggle = (id, currentStatus) => {
    const newData = {
      id: id,
      isActive: currentStatus ? "inactive" : "active",
    };
    setPendingId(id);
    mutateAsync(newData)
      .finally(() => {
        setPendingId(null);
      });
    setEditingId(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
  };

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


      <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto" >
      <table className="w-full border min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-[#7F0284] text-white">
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Mobile Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Created Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.length > 0 ? (
            data?.data?.map((item) => (
              <tr key={item._id} className="border-t text-center">
                <td className="px-6 py-4 whitespace-nowrap">{item?.firstName + " " + (item?.lastName || "")}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.address || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.phoneNumber || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(item?.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={
                      item?.isActive ? "text-green-600" : "text-red-600"
                    }
                  >
                    {item?.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-2 flex justify-center gap-2 items-center">
                  <button
                    className={`text-white text-sm rounded-md transition duration-200 ${
                      item?.isActive
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    onClick={() => handleActiveToggle(item._id, item?.isActive)}
                    style={{ padding: "5px 14px" }}
                    disabled={pendingId === item._id}
                  >
                    {pendingId === item._id
                      ? "Processing..."
                      : item?.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                  <AiFillDelete
                    className="text-red-600 cursor-pointer text-xl hover:text-red-800"
                    onClick={() => handleDeleteUser(item._id)}
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
      </div>
      </div>

      

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