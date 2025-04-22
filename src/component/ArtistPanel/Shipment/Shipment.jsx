import { useState } from "react";
import {
  AiFillEye,
  AiFillDelete,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { useGetAllUteList } from "./https/useGetAllUteList";
import { BASE_IMAGE_URL } from "../../utils/exports";
import useGetApproveRejectMutaion from "./https/useGetApproveRejectMutaion";
import useDeleteUte from "./https/useDeleteUte";
import { FaCar } from "react-icons/fa";

const ShipmentTable = () => {
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [viewingFaq, setViewingFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingAction, setPendingAction] = useState(null);
  const itemsPerPage = 10;

  const { data, isLoading } = useGetAllUteList({
    page: currentPage,
    limit: itemsPerPage,
  });

  const totalPages = Math.ceil((data?.totalCount || 0) / itemsPerPage);

  const handleViewFaq = (faq) => {
    setViewingFaq(faq);
    setViewModalOpen(true);
  };

  const { mutate } = useDeleteUte();

  const handleDeleteFaq = (id) => {
    mutate(id);
  };

  const { mutateAsync, isPending } = useGetApproveRejectMutaion();

  const handleStatusChange = (id, status) => {
    setPendingAction({ id, status });
    const newData = {
      id: id,
      status: status,
    };

    mutateAsync(newData).then(() => {
      setPendingAction(null);
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          UTE Management
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-700 text-white">
              <tr>
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
                  "Status",
                  "Created At",
                  "Actions",
                ].map((heading, index) => (
                  <th
                    key={index}
                    className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      index === 0 ? "rounded-tl-lg" : ""
                    } ${index === 12 ? "rounded-tr-lg" : ""}`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data?.length > 0 ? (
                data.data.map((faq) => (
                  <tr
                    key={faq._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {faq?.fullName || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                      {faq?.description
                        ? faq.description.length > 50
                          ? `${faq.description.substring(0, 50)}...`
                          : faq.description
                        : "No description"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {faq?.licenceNumber || "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {faq?.licenceExpireDate
                        ? faq.licenceExpireDate?.licenceExpireMonth +
                          "/" +
                          faq.licenceExpireDate?.licenceExpireYear
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {faq?.serviceCity || "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {faq?.state || "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {faq?.uteModel || "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {faq?.chesisNumber || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {faq?.uteAvailble?.join(", ") || "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {faq?.budget ? `$${faq.budget}` : "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-10">
                        {faq?.uteImages?.[0] ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={`${BASE_IMAGE_URL}/uteImages/${faq.uteImages[0]}`}
                            alt="UTE"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <FaCar />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          faq?.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : faq?.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {faq?.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {faq?.createdAt ? `${faq?.createdAt}` : "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewFaq(faq)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-purple-50 transition-colors"
                          title="View"
                        >
                          <AiFillEye className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange(faq._id, "Approved")
                          }
                          className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded disabled:opacity-50 transition-colors"
                          disabled={
                            faq?.status === "Approved" ||
                            (isPending &&
                              pendingAction?.id === faq._id &&
                              pendingAction?.status === "Approved")
                          }
                          title="Approve"
                        >
                          {isPending &&
                          pendingAction?.id === faq._id &&
                          pendingAction?.status === "Approved"
                            ? "Processing"
                            : "Approve"}
                        </button>
                      
                        <button
                          onClick={() =>
                            handleStatusChange(faq._id, "Rejected")
                          }
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded disabled:opacity-50 transition-colors"
                          disabled={
                            faq?.status === "Rejected" ||
                            (isPending &&
                              pendingAction?.id === faq._id &&
                              pendingAction?.status === "Rejected")
                          }
                          title="Reject"
                        >
                          {isPending &&
                          pendingAction?.id === faq._id &&
                          pendingAction?.status === "Rejected"
                            ? "Processing"
                            : "Reject"}
                        </button>
                        {/* )} */}

                        <button
                          onClick={() => handleDeleteFaq(faq._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <AiFillDelete className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="px-4 py-6 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <svg
                        className="w-16 h-16 mb-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <p className="text-lg font-medium text-gray-700">
                        No UTE Listings Found
                      </p>
                      <p className="text-sm max-w-md mt-2">
                        There are currently no UTE listings available. Check
                        back later or add a new UTE.
                      </p>
                    </div>
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

      <div className="flex justify-end items-center space-x-2 mt-5">
        <span className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, data?.totalCount || 0)} of{" "}
          {data?.totalCount || 0} entries
        </span>
      </div>

      {isViewModalOpen && viewingFaq && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                UTE Details
              </h2>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingFaq?.fullName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Description
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingFaq?.description || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Licence Number
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingFaq?.licenceNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Expiry Date
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingFaq?.licenceExpireDate
                        ? new Date(
                            viewingFaq.licenceExpireDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Service Cities
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingFaq?.serviceCity || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Location
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingFaq?.location || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      UTE Model
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingFaq?.uteModel || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Chassis Number
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingFaq?.chesisNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Availability
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingFaq?.uteAvailble?.join(", ") || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Budget
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingFaq?.budget ? `$${viewingFaq.budget}` : "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Status
                    </h3>
                    <p className="mt-1 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          viewingFaq?.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : viewingFaq?.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {viewingFaq?.status || "Pending"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Images
                </h3>
                <div className="flex flex-wrap gap-4">
                  {viewingFaq?.uteImages?.length > 0 ? (
                    viewingFaq.uteImages.map((image, index) => (
                      <div
                        key={index}
                        className="w-32 h-32 rounded-md overflow-hidden border border-gray-200"
                      >
                        <img
                          src={`${BASE_IMAGE_URL}/uteImages/${image}`}
                          alt={`UTE ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No images available</p>
                  )}
                </div>

              <h1>Licence Image</h1>

                <div>
                  {viewingFaq?.licenceImage ?  <div className="w-32 h-32 rounded-md overflow-hidden border border-gray-200">
                    <img
                      src={`${BASE_IMAGE_URL}/licences/${viewingFaq?.licenceImage}`}
                      className="w-full h-full object-cover"
                    />
                  </div>  : null}
                 
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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





