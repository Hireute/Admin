import React, { useState } from "react";
import { FaReply, FaEye } from "react-icons/fa";
import { useGetQueries } from "./https/useGetQueries";
import Loader from "../../utils/Loader";

const Queries = () => {
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [viewQuery, setViewQuery] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchEmail, setSearchEmail] = useState("");

  const itemsPerPage = 10;

  // Query parameters object for the API
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    sort: sortOrder,
    email: searchEmail,
  };

  const { data, isLoading } = useGetQueries(queryParams);

  // Use the data from the hook if available, otherwise use empty defaults
  const queriesData = data?.queries || [];
  const totalPages = data?.totalPages || 1;

  // Filter and sort are handled server-side, so we just use the paginated data directly
  const paginatedQueries = queriesData;

  const truncateMessage = (message) => {
    return (
      message.split(" ").slice(0, 5).join(" ") +
      (message.split(" ").length > 5 ? "..." : "")
    );
  };

  const handleReply = (query) => {
    setSelectedQuery(query);
  };

  const handleView = (query) => {
    setViewQuery(query);
  };

  const handleSendReply = () => {
    console.log("Sending reply to:", selectedQuery.email);
    console.log("Message:", replyMessage);
    setSelectedQuery(null);
    setReplyMessage("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Queries</h2>

      {/* Search and Sort Controls */}
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

      {/* Queries Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#7F0284] text-white">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Message</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          {isLoading ? (
            <Loader />
          ) : (
            <tbody>
              {paginatedQueries.map((query) => (
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
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
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

      {/* View Details Modal */}
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
                <strong>Replied:</strong> {viewQuery.replied ? "Yes" : "No"}
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

      {/* Reply Modal */}
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
                  Message:
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7F0284] transition-colors min-h-[120px] resize-y"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setSelectedQuery(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  className="px-4 py-2 bg-[#7F0284] text-white rounded-lg hover:bg-[#6B0270] transition-colors"
                >
                  Send Reply
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
