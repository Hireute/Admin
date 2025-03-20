import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useGetAllJobUserList } from "./https/useGetAllJobUserList";
import useRevokeMutation from "./https/useRevokeMutation";
import useSuspendMutation from "./https/useSuspendMutation";
import Loader from "../../utils/Loader";
import { BASE_IMAGE_URL } from "../../utils/exports";
import useDeleteJob from "./https/useDeleteJob";

const JobList = () => {
  const [faqs, setFaqs] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [pendingActions, setPendingActions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("none");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Pass currentPage as part of the query key to ensure refetching
  const { data, isLoading, isFetching } = useGetAllJobUserList({ page: currentPage , limit: 10 });

  const { mutate: approveMutate, isPending: approvePending } = useRevokeMutation();

  const paginatedData = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const paginationInfo = data?.paginationData || {};
  const totalPages = paginationInfo?.totalPages || Math.ceil(totalCount / (paginationInfo?.limit || 10));



  console.log(data)

  const filteredData = paginatedData
    ?.filter((faq) =>
      faq?.title?.toLowerCase().includes(searchTerm.toLowerCase())
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

      console.log("chnaged")
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
  };

  const onSubmit = (data) => {
    if (editingId !== null) {
      setFaqs((prev) =>
        prev.map((faq) => (faq.id === editingId ? { ...faq, ...data } : faq))
      );
    } else {
      const newFaq = { id: Date.now(), ...data, status: "Pending" };
      setFaqs([...faqs, newFaq]);
    }
    reset();
    setEditingId(null);
    setAddModalOpen(false);
  };

  const handleViewJob = (faq) => {
    setSelectedJob(faq);
    setViewModalOpen(true);
  };

  const handleApproveFaq = (id) => {
    setPendingActions((prev) => ({ ...prev, [`approve-${id}`]: true }));
    const newData = { id, status: "Approved" };
    approveMutate(newData, {
      onSuccess: () => {
        setFaqs((prev) =>
          prev.map((faq) =>
            faq.id === id ? { ...faq, status: "Approved" } : faq
          )
        );
      },
      onSettled: () => {
        setPendingActions((prev) => ({ ...prev, [`approve-${id}`]: false }));
      },
    });
  };

  const handleRejectFaq = (id) => {
    setPendingActions((prev) => ({ ...prev, [`reject-${id}`]: true }));
    const newData = { id, status: "reject" };
    approveMutate(newData, {
      onSuccess: () => {
        setFaqs((prev) =>
          prev.map((faq) =>
            faq.id === id ? { ...faq, status: "Rejected" } : faq
          )
        );
      },
      onSettled: () => {
        setPendingActions((prev) => ({ ...prev, [`reject-${id}`]: false }));
      },
    });
  };

  const { mutate } = useDeleteJob();
  const handleDeleteFaq = (id) => {
    mutate(id);
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs List</h1>
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 w-[30vw] border rounded-md"
          />
          <select
            value={budgetFilter}
            onChange={(e) => handleBudgetFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="none">No Filter</option>
            <option value="lowToHigh">Budget: Low to High</option>
            <option value="highToLow">Budget: High to Low</option>
          </select>
        </div>
      </div>

      {/* Show loading indicator when fetching new page data */}
      {isFetching && <div className="text-center py-2">Loading...</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#7F0284] text-white">
              {[
                "Job Title",
                "Description",
                "State",
                "Service City",
                "Shift",
                "Budget",
                "Ute Image",
                "Created Date",
                "View",
                "Status",
                "Actions",
              ].map((heading, index) => (
                <th key={index} className="px-4 py-3 whitespace-nowrap">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((faq) => (
                <tr key={faq.id} className="border-t text-center">
                  <td className="p-2">{faq?.title}</td>
                  <td>
                    {faq?.description?.split(" ").slice(0, 3).join(" ") +
                      (faq?.description?.split(" ").length > 3 ? "..." : "")}
                  </td>
                  <td className="p-2">{faq?.state}</td>
                  <td className="p-2">{faq?.location}</td>
                  <td className="p-2">{faq?.workSchedule?.join(", ")}</td>
                  <td className="p-2">{faq?.budget}</td>
                  <td className="p-2">
                    {faq?.jobImg?.[0] ? (
                      <img
                        src={`${BASE_IMAGE_URL}/jobImg/${faq.jobImg[0]}`}
                        alt="Job"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="p-2">{formatDate(faq?.createdAt)}</td>
                  <td className="p-2">
                    <FaEye
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleViewJob(faq)}
                    />
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded ${
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
                  <td className="p-2 flex justify-center gap-3 items-center">
                    <span
                      onClick={() => handleApproveFaq(faq?._id)}
                      className="px-2 border border-zinc-400 rounded-md py-2 font-semibold bg-green-500 text-white cursor-pointer"
                    >
                      {pendingActions[`approve-${faq?._id}`]
                        ? "Approving..."
                        : "Approve"}
                    </span>
                    <span
                      onClick={() => handleRejectFaq(faq?._id)}
                      className="px-2 border border-zinc-400 rounded-md py-2 font-semibold bg-red-500 text-white cursor-pointer"
                    >
                      {pendingActions[`reject-${faq?._id}`]
                        ? "Rejecting..."
                        : "Reject"}
                    </span>
                    <AiFillDelete
                      className="text-red-500 cursor-pointer text-xl"
                      onClick={() => handleDeleteFaq(faq?._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="p-4 text-center">
                  No Jobs Listed
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!paginationInfo?.hasPrevious || isFetching}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!paginationInfo?.hasNext || isFetching}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {isViewModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Job Details</h2>
            <div className="space-y-2">
              <p>
                <strong>Job Title:</strong> {selectedJob.title}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.description}
              </p>
              <p>
                <strong>State:</strong> {selectedJob.state}
              </p>
              <p>
                <strong>Service City:</strong> {selectedJob.location}
              </p>
              <p>
                <strong>Shift:</strong> {selectedJob.workSchedule?.join(", ")}
              </p>
              <p>
                <strong>Budget:</strong> {selectedJob.budget}
              </p>
              <p>
                <strong>Created Date:</strong> {formatDate(selectedJob.createdAt)}
              </p>
              <p>
                <strong>Status:</strong> {selectedJob.status || "Pending"}
              </p>
              {selectedJob.jobImg?.length > 0 ? (
                <div>
                  <strong>Job Image(s):</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedJob.jobImg.map((item, index) => (
                      <img
                        key={index}
                        src={`${BASE_IMAGE_URL}/jobImg/${item}`}
                        alt={`Job Image ${index + 1}`}
                        className="w-32 h-32 object-cover rounded"
                        onError={(e) => (e.target.src = "/fallback-image.jpg")}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div>No job images available.</div>
              )}
            </div>
            <button
              onClick={() => setViewModalOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;