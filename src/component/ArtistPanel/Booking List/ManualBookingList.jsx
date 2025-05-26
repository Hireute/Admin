import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useTransferManualUteMutaion } from './https/useTransferManualUteMutaion';
import { useGetBankInfo } from './https/useGetBankInfo';

const ManualBookingList = ({ data, handleTransferAmount, handleDelete }) => {
  const [processingId, setProcessingId] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    
    amount: ''
  });

  const [id, setId] = useState(null)

  const handleManualTransferClick = (booking) => {
    setSelectedBooking(booking);

    setPaymentDetails({
      amount: booking.amount
    });
    setId(booking?.uteBy)
    setShowPaymentModal(true);
  };


  const {mutate , isPending} = useTransferManualUteMutaion(setProcessingId)
 const { data: bankInfoData, isLoading } = useGetBankInfo({ id, showPaymentModal });

  const handlePayNow = () => {
    mutate(selectedBooking?._id)
    
    setProcessingId(null);
    setShowPaymentModal(false);
    handleTransferAmount(selectedBooking, paymentDetails);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      handleDelete(id);
    }
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
            <table className="w-full border bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-[#7F0284] text-white">
                  {[
                    "User Name",
                    "Ute Name",
                    "Amount",
                    "Actual Amount",
                    "Request Amount",
                    "Status",
                    "Pickup Address",
                    "Drop Address",
                    "Ute Booking ID",
                    "Is-Transfered",
                    "Actions",
                  ].map((heading, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.data?.map((booking) => (
                  <tr
                    key={booking?._id}
                    className="hover:bg-gray-50 transition-colors text-center"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate">
                      {booking?.bookingBy}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                      {booking?.uteName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                      ${booking?.amount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                      ${booking?.actualAmount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                      ${booking?.requestAmount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          booking?.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking?.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                      {`${booking?.pickupAddress?.street}, ${booking?.pickupAddress?.state} ${booking?.pickupAddress?.postalCode}`}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                      {`${booking?.dropAddress?.street}, ${booking?.dropAddress?.state} ${booking?.dropAddress?.postalCode}`}
                    </td>

                   <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                     
                        {booking?.uteBookingId || "N/A"}
                    
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white bg-orange-600 px-2 rounded-md tracking-tight">
                        {booking?.isTransfered ? "Transfered" : "N/A"}
                      </div>
                    </td>
                    <td className="p-2 flex justify-center gap-3">
                      <button
                        className="bg-[#7F0284] text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={
                           booking?.status !== "delivered" ||
                          booking?.isTransfered === true 
                        }
                        aria-disabled={booking?.status !== "delivered"}
                        onClick={() => handleManualTransferClick(booking)}
                      >
                        {processingId === booking?._id ? (
                          <div className={`flex items-center ${isPending ? "cursor-not-allowed" : ""}`}>
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
                      {/* <AiFillDelete
                        onClick={() => handleDeleteBooking(booking?._id)}
                        className="text-red-600 text-2xl cursor-pointer"
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Modal */}
    {showPaymentModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#7F0284]">Manual Payment</h3>
        <button 
          onClick={() => setShowPaymentModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
      
      <div className="space-y-4">
        <div className='flex items-center justify-between'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Account Number
          </label>
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7F0284]"></div>
          ) : (
            <span>{bankInfoData?.data?.accountNumber}</span>
          )}
        </div>
        
        <div className='flex items-center justify-between'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            BSB Number
          </label>
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7F0284]"></div>
          ) : (
            <span>{bankInfoData?.data?.bsbCode}</span>
          )}
        </div>
        
        <div className='flex items-center justify-between'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Holder Name
          </label>
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7F0284]"></div>
          ) : (
            <span>{bankInfoData?.data?.accountHolderName}</span>
          )}
        </div>
        
        <div className='flex items-center justify-between'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Name
          </label>
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7F0284]"></div>
          ) : (
            <span>{bankInfoData?.data?.bankName}</span>
          )}
        </div>
        
        <div className='flex items-center justify-between'>
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
            setShowPaymentModal(false)
            setId(null)
            setProcessingId(null)
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
          {isPending ? 'Processing...' : 'Transfer'}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ManualBookingList;