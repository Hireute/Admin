import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useTransferManualUteMutaion } from "./https/useTransferManualUteMutaion";
import { useGetBankInfo } from "./https/useGetBankInfo";


const ManualJobListing = ({ data, handleTransferAmount, handleDelete }) => {
  const [processingId, setProcessingId] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [id, setId] = useState(null);

  const [paymentDetails, setPaymentDetails] = useState({
    bankAccountNumber: "",
    bsbNumber: "",
    accountHolderName: "",
    bankName: "",
    amount: "",
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const { data: bankInfoData, isLoading } = useGetBankInfo({
    id,
    showPaymentModal,
  });

  const { mutate, isPending } = useTransferManualUteMutaion(setProcessingId);
  const handleManualTransferClick = (booking) => {
    setSelectedBooking(booking);
    setPaymentDetails({
      ...paymentDetails,
      amount: booking?.amount,
    });
    
    setId(booking?.uteBy);
    setShowPaymentModal(true);
  };

 
  const handlePayNow = () => {
    mutate(selectedBooking?._id);
    setProcessingId(selectedBooking?._id);
    setShowPaymentModal(false);
    setProcessingId(null);
  };

  return (
    <div>
      {data?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">


              <thead className="bg-[#7F0284] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Job Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Ute Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Ute Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Created At
                  </th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Job Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Is-Transfered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {data &&  data?.map((booking) => (
                  <tr key={booking?._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking?.jobTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking?.bookingBy}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking?.uteName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${booking?.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          booking?.status
                        )}`}
                      >
                        {booking?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking?.createdAt}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking?.jobBookingId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white bg-orange-600 px-2 rounded-md tracking-tight">
                        {booking?.isTransfered === true ? "Transfered" : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className={`bg-[#7F0284] text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${
                            booking?.isTransfered === true
                              ? "pointer-events-none opacity-50"
                              : ""
                          }`}
                          disabled={booking?.status !== "delivered"}
                          aria-disabled={
                            booking?.status !== "delivered" ||
                            booking?.isTransfered === true
                          }
                          onClick={() => handleManualTransferClick(booking)}
                        >
                          {processingId === booking?._id ? (
                            <div
                              className={`flex items-center ${
                                isPending ? "cursor-not-allowed" : ""
                              }`}
                            >
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Transfering....
                            </div>
                          ) : (
                            "Transfer"
                          )}
                        </button>
                        {/* <button
                          onClick={() => handleDelete(booking?._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <AiFillDelete className="h-5 w-5" />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>


            </table>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#7F0284]">
                Manual Payment
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Account Number
                </label>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7F0284]"></div>
                ) : (
                  <span>{bankInfoData?.data?.accountNumber}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  BSB Number
                </label>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7F0284]"></div>
                ) : (
                  <span>{bankInfoData?.data?.bsbCode}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Holder Name
                </label>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7F0284]"></div>
                ) : (
                  <span>{bankInfoData?.data?.accountHolderName}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7F0284]"></div>
                ) : (
                  <span>{bankInfoData?.data?.bankName}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to Transfer
                </label>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7F0284]"></div>
                ) : (
                  <span>{paymentDetails?.amount}</span>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setId(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePayNow}
                className="px-4 py-2 bg-[#7F0284] text-white rounded-md hover:bg-[#6a0270] disabled:opacity-50"
                disabled={isPending || isLoading}
              >
                {isPending ? "Processing..." : "Transfer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualJobListing;
