import { useState } from "react";
import { AiFillDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaEye, FaFilter, FaSearch } from "react-icons/fa";
import { useGetAllJobUserList } from "./https/useGetAllJobUserList";
import useRevokeMutation from "./https/useRevokeMutation";
import Loader from "../../utils/Loader";
import { BASE_IMAGE_URL } from "../../utils/exports";
import useDeleteJob from "./https/useDeleteJob";
import { FaClipboardList } from "react-icons/fa";

const JobList = () => {
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [pendingActions, setPendingActions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("none");
  const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 10;

  const {
    data,
    isLoading,
    isFetching
  } = useGetAllJobUserList({ page: currentPage, limit: 10 });

  const { mutate: approveMutate } = useRevokeMutation();
  const { mutate: deleteJob } = useDeleteJob();

  const paginatedData = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const paginationInfo = data?.paginationData || {};
  const totalPages = paginationInfo?.totalPages || Math.ceil(totalCount / 10);

  const filteredData = paginatedData
    ?.filter((job) =>
      job?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (budgetFilter === "lowToHigh") {
        return Number(a.budget) - Number(b.budget);
      } else if (budgetFilter === "highToLow") {
        return Number(b.budget) - Number(a.budget);
      }
      return 0;
    });

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleBudgetFilter = (filter) => {
    setBudgetFilter(filter);
    setCurrentPage(1);
    setShowFilters(false);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setViewModalOpen(true);
  };

  const handleApproveJob = (id) => {
    setPendingActions((prev) => ({ ...prev, [`approve-${id}`]: true }));
    const newData = { id, status: "Approved" };
    approveMutate(newData, {
      onSettled: () => {
        setPendingActions((prev) => ({ ...prev, [`approve-${id}`]: false }));
      },
    });
  };

  const handleRejectJob = (id) => {
    setPendingActions((prev) => ({ ...prev, [`reject-${id}`]: true }));
    const newData = { id, status: "Rejected" };
    approveMutate(newData, {
      onSettled: () => {
        setPendingActions((prev) => ({ ...prev, [`reject-${id}`]: false }));
      },
    });
  };

  const handleDeleteJob = (id) => {
    // if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
    // }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader /></div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Job Listings</h1>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <FaFilter className="text-gray-600" />
              <span>Filter</span>
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={() => handleBudgetFilter("none")}
                    className={`block w-full text-left px-4 py-2 text-sm ${budgetFilter === "none" ? "bg-purple-100 text-purple-800" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    No Filter
                  </button>
                  <button
                    onClick={() => handleBudgetFilter("lowToHigh")}
                    className={`block w-full text-left px-4 py-2 text-sm ${budgetFilter === "lowToHigh" ? "bg-purple-100 text-purple-800" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    Budget: Low to High
                  </button>
                  <button
                    onClick={() => handleBudgetFilter("highToLow")}
                    className={`block w-full text-left px-4 py-2 text-sm ${budgetFilter === "highToLow" ? "bg-purple-100 text-purple-800" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    Budget: High to Low
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isFetching && (
        <div className="flex justify-center py-2">
          <Loader size="small" />
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-700 text-white">
              <tr>
                {[
                  "Job Title",
                  "Description",
                  "State",
                  "Location",
                  "Shift",
                  "Budget",
                  "Image",
                  "Created",
                  "Status",
                  // "Created At",
                  "JOB ID",
                  "Actions"
                ].map((heading, index) => (
                  <th
                    key={index}
                    className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      index === 0 ? "rounded-tl-lg" : ""
                    } ${
                      index === 10 ? "rounded-tr-lg" : ""
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData?.length > 0 ? (
                filteredData.map((job) => (
                  <tr key={job?._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate">
                      {job?.title || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                      {job?.description || "No description"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {job?.state || "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {job?.location || "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {job?.workSchedule?.join(", ") || "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {job?.budget ? `$${job.budget}` : "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-10">
                        {job?.jobImg?.[0] ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={`${BASE_IMAGE_URL}/jobImg/${job.jobImg[0]}`}
                            alt="Job"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                           <FaClipboardList />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(job?.createdAt)}
                    </td>

                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {job?.jobId}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          job?.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : job?.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {job?.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewJob(job)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-purple-50 transition-colors"
                          title="View"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                          <button
                            onClick={() => handleApproveJob(job?._id)}
                            className="text-white  p-1 rounded-md bg-green-500 transition-colors"
                            title="Approve"
                            disabled={job?.status === "Approved"}
                          >
                            {pendingActions[`approve-${job?._id}`] ? (
                              <span className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                            ) : (
                              "Approve"
                            )}
                          </button>
                      
                          <button
                            onClick={() => handleRejectJob(job._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                            title="Reject"
                            disabled={pendingActions[`reject-${job?._id}`]  || job?.status === "Approved" || pendingActions[`approve-${job?._id}`]}
                          >
                            {pendingActions[`reject-${job?._id}`] ? (
                              <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                            ) : (
                              "Reject"
                            )}
                          </button>

                        <button
                          onClick={() => handleDeleteJob(job?._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <AiFillDelete className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-4 py-6 text-center">
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
                      <p className="text-lg font-medium text-gray-700">No Jobs Found</p>
                      <p className="text-sm max-w-md mt-2">
                        {searchTerm
                          ? "No jobs match your search criteria. Try a different search."
                          : "There are currently no job listings available."}
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

      {isViewModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-purple-700 text-white">
              <h2 className="text-xl font-semibold">Job Details</h2>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Job Title</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedJob?.title || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedJob?.description || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">State</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedJob?.state || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedJob?.location || "N/A"}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Work Schedule</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedJob?.workSchedule?.join(", ") || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Budget</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedJob?.budget ? `$${selectedJob.budget}` : "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Created Date</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedJob?.createdAt)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <p className="mt-1 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedJob?.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : selectedJob?.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedJob?.status || "Pending"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Job Images</h3>
                <div className="flex flex-wrap gap-4">
                  {selectedJob?.jobImg?.length > 0 ? (
                    selectedJob.jobImg.map((image, index) => (
                      <div key={index} className="w-32 h-32 rounded-md overflow-hidden border border-gray-200">
                        <img
                          src={`${BASE_IMAGE_URL}/jobImg/${image}`}
                          alt={`Job Image ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder-job.png";
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No images available</p>
                  )}
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

export default JobList;



