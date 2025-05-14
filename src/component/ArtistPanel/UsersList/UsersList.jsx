import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllUserList } from "./https/useGetAllUserList";
import useActiveMutation from "./https/useActiveMutation";
import Loader from "../../utils/Loader";
import { AiFillDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import useDeleteUser from "./https/useDeleteUser";

const UsersList = () => {
  const [pendingId, setPendingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllUserList({ page: currentPage, limit, searchTerm });
  
  const { mutateAsync , isPending  } = useActiveMutation();
  const { mutate: deleteUser } = useDeleteUser();
   const itemsPerPage = 10;

  const handleActiveToggle = (id, currentStatus) => {
    const newData = {
      id: id,
      isActive: currentStatus ? "inActive" : "active",
    };
    setPendingId(id);
    mutateAsync(newData)
      .finally(() => {
        setPendingId(null);
      });
    
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
                    onClick={() => handleActiveToggle(item?._id, item?.isActive)}
                    style={{ padding: "5px 14px" }}
                    disabled={pendingId === item?._id || isPending}
                  >
                    {pendingId === item?._id
                      ? "Processing..."
                      : item?.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                  <AiFillDelete
                    className="text-red-600 cursor-pointer text-xl hover:text-red-800"
                    onClick={() => handleDeleteUser(item?._id)}
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
      {totalPages > 1 && (
               <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
                 <div className="flex-1 flex justify-between sm:hidden">
                   <button
                     onClick={() => handlePageChange(currentPage - 1)}
                     disabled={currentPage === 1}
                     className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                   >
                     Previous
                   </button>
                   <button
                     onClick={() => handlePageChange(currentPage + 1)}
                     disabled={currentPage === totalPages}
                     className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                   >
                     Next
                   </button>
                 </div>
                 <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                   <div>
                     <p className="text-sm text-gray-700">
                       Showing{" "}
                       <span className="font-medium">
                         {(currentPage - 1) * itemsPerPage + 1}
                       </span>{" "}
                       to{" "}
                       <span className="font-medium">
                         {Math.min(
                           currentPage * itemsPerPage,
                           data?.totalCount || 0
                         )}
                       </span>{" "}
                       of{" "}
                       <span className="font-medium">{data?.totalCount || 0}</span>{" "}
                       results
                     </p>
                   </div>
                   <div>
                     <nav
                       className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                       aria-label="Pagination"
                     >
                       <button
                         onClick={() => handlePageChange(currentPage - 1)}
                         disabled={currentPage === 1}
                         className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                       >
                         <span className="sr-only">Previous</span>
                         <AiOutlineLeft className="h-5 w-5" aria-hidden="true" />
                       </button>
                       {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                         let pageNum;
                         if (totalPages <= 5) {
                           pageNum = i + 1;
                         } else if (currentPage <= 3) {
                           pageNum = i + 1;
                         } else if (currentPage >= totalPages - 2) {
                           pageNum = totalPages - 4 + i;
                         } else {
                           pageNum = currentPage - 2 + i;
                         }
     
                         return (
                           <button
                             key={pageNum}
                             onClick={() => handlePageChange(pageNum)}
                             className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                               currentPage === pageNum
                                 ? "z-10 bg-purple-600 border-purple-600 text-white"
                                 : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                             }`}
                           >
                             {pageNum}
                           </button>
                         );
                       })}
                       <button
                         onClick={() => handlePageChange(currentPage + 1)}
                         disabled={currentPage === totalPages}
                         className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                       >
                         <span className="sr-only">Next</span>
                         <AiOutlineRight className="h-5 w-5" aria-hidden="true" />
                       </button>
                     </nav>
                   </div>
                 </div>
               </div>
             )}




      </div>
<div className="flex justify-between items-center mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
  <div className="text-sm text-gray-600">
    Showing <span className="font-medium text-gray-800">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
    <span className="font-medium text-gray-800">
      {Math.min(currentPage * itemsPerPage, data?.totalCount || 0)}
    </span> of{" "}
    <span className="font-medium text-gray-800">{data?.totalCount || 0}</span> entries
  </div>
  
  {/* If you have pagination controls, they would go here */}
  <div className="flex space-x-2">
    {/* Previous button would go here */}
    {/* Page numbers would go here */}
    {/* Next button would go here */}
  </div>
</div>
      
    </div>
  );
};

export default UsersList;