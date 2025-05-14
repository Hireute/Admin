import React, { useState } from "react";
import { FaReply, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai"; // Added delete icon import
import { useGetQueries } from "./https/useGetQueries";
import Loader from "../../utils/Loader";
import useReplyMutation from "./https/useReplyMutation";
import useDeleteQueries from "./https/useDeleteQueries";

const Queries = () => {
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [viewQuery, setViewQuery] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchEmail, setSearchEmail] = useState("");

  const itemsPerPage = 10;

  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    sort: sortOrder,
    email: searchEmail,
  };

  const { data, isLoading } = useGetQueries(queryParams);
  const { mutate: sendReply, isPending: isReplying } = useReplyMutation();

  const queriesData = data?.queries || [];
  const totalPages = data?.totalPages || 1;

  const paginatedQueries = queriesData;

  const truncateMessage = (message) => {
    return (
      message.split(" ").slice(0, 5).join(" ") +
      (message.split(" ").length > 5 ? "..." : "")
    );
  };

  const handleReply = (query) => {
    setSelectedQuery(query);
    setReplyMessage("");
  };

  const handleView = (query) => {
    setViewQuery(query);
  };


  const {mutate} = useDeleteQueries()
  const handleDelete = (queryId) => {
    mutate(queryId);
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      alert("Please enter a reply message");
      return;
    }

    const replyData = {
      queryId: selectedQuery._id,
      reply: replyMessage,
    };

    sendReply(replyData, {
      onSuccess: () => {
       
        setSelectedQuery(null);
        setReplyMessage("");
      },
      onError: (error) => {
        console.error("Error sending reply:", error);
        alert("Failed to send reply. Please try again.");
      },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Queries</h2>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7F0284] transition-colors"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7F0284] transition-colors"
        >
          <option value="latest">Sort by Latest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#7F0284] text-white">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Message</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Replies</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="py-4">
                  <Loader />
                </td>
              </tr>
            ) : paginatedQueries.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No queries found
                </td>
              </tr>
            ) : (
              paginatedQueries.map((query) => (
                <tr key={query._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{`${query.firstName} ${query.lastName}`}</td>
                  <td className="py-3 px-4">{query.email}</td>
                  <td className="py-3 px-4">{query.phone}</td>
                  <td className="py-3 px-4">
                    {truncateMessage(query.message)}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(query.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{query.replies?.length || 0}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleView(query)}
                      className="flex items-center gap-2 bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleReply(query)}
                      className="flex items-center gap-2 bg-[#7F0284] text-white px-3 py-1 rounded-lg hover:bg-[#6B0270] transition-colors"
                    >
                      <FaReply /> Reply
                    </button>
                    <button
                      onClick={() => handleDelete(query._id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === page
                ? "bg-[#7F0284] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors`}
          >
            {page}
          </button>
        ))}
      </div>

      {viewQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Query Details
            </h3>
            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {viewQuery.firstName}{" "}
                {viewQuery.lastName}
              </p>
              <p>
                <strong>Email:</strong> {viewQuery.email}
              </p>
              <p>
                <strong>Phone:</strong> {viewQuery.phone}
              </p>
              <p>
                <strong>Message:</strong> {viewQuery.message}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(viewQuery.date).toLocaleString()}
              </p>
              <p>
                <strong>Replies:</strong>{" "}
                {viewQuery.replies?.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {viewQuery.replies.map((reply, index) => (
                      <li key={index}>{reply}</li>
                    ))}
                  </ul>
                ) : (
                  "No replies yet"
                )}
              </p>
            </div>
            <button
              onClick={() => setViewQuery(null)}
              className="mt-4 px-4 py-2 bg-[#7F0284] text-white rounded-lg hover:bg-[#6B0270] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaReply className="text-[#7F0284]" /> Reply to{" "}
              {selectedQuery.firstName}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  To:
                </label>
                <input
                  type="email"
                  value={selectedQuery.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Original Query:
                </label>
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100">
                  {selectedQuery.message}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Reply:
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7F0284] transition-colors min-h-[120px] resize-y"
                  disabled={isReplying}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setSelectedQuery(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={isReplying}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  className={`px-4 py-2 bg-[#7F0284] text-white rounded-lg hover:bg-[#6B0270] transition-colors flex items-center gap-2 ${
                    isReplying ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isReplying}
                >
                  {isReplying ? <>Sending...</> : "Send Reply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queries;