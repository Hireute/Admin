import { useState, useEffect } from "react";
import {
  AiOutlineLeft,
  AiOutlineLoading3Quarters,
  AiOutlineRight,
} from "react-icons/ai";
import { useGetPaymentHistory } from "./https/useGetPaymentHistory";
import ManualPayments from "./ManualPayments";
import { useGetManualPayments } from "./https/useGetManualPayments";

const PaymentHistory = () => {
  const { data: paymentData, isLoading } = useGetPaymentHistory();
  const { data: manualPaymentData, isLoading: manualLoading } =
    useGetManualPayments();
  const [activeTab, setActiveTab] = useState("stripe");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;
  const itemsPerPage = 10;

  const processedPayments =
    paymentData?.data
      ?.filter(
        (payment) =>
          payment.paymentBy.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (activeTab === "stripe" ? !payment.isStripe : payment.isStripe)
      )
      ?.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      }) || [];

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = processedPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );
  const totalPages = Math.ceil(processedPayments.length / paymentsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, activeTab]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "succeeded":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "AUD",
    }).format(amount / 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-6 flex justify-center items-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-purple-700" />
      </div>
    );
  }

  return (
    <div className="w-full p-6 rounded-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Payment History</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            className="p-2 border rounded-lg"
            value={sortOrder}
            onChange={(e) => setSortOrder(e?.target?.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("stripe")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "stripe"
                ? "border-purple-700 text-purple-700"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Stripe Payments
          </button>
          <button
            onClick={() => setActiveTab("manual")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "manual"
                ? "border-purple-700 text-purple-700"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Manual Payments
          </button>
        </nav>
      </div>

      {activeTab === "manual" ? (
        <ManualPayments
          payments={manualPaymentData?.data}
          formatAmount={formatAmount}
          formatDate={formatDate}
          getStatusColor={getStatusColor}
        />
      ) : (
        <>
          {paymentData?.data.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">
                No {activeTab} payment records found
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#7F0284] text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentData?.data?.map((payment) => (
                      <tr key={payment?._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {payment?.paymentBy}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatAmount(payment?.amount)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(payment?.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {payment?.status}
                          </span>
                        </td>
                      </tr>
                    ))}
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
                            paymentData?.totalCount || 0
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {paymentData?.totalCount || 0}
                        </span>{" "}
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
                          <AiOutlineLeft
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        {Array.from(
                          { length: Math.min(totalPages, 5) },
                          (_, i) => {
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
                          }
                        )}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          <span className="sr-only">Next</span>
                          <AiOutlineRight
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-medium text-gray-800">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-gray-800">
                    {Math.min(
                      currentPage * itemsPerPage,
                      paymentData?.totalCount || 0
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-gray-800">
                    {paymentData?.totalCount || 0}
                  </span>{" "}
                  entries
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
