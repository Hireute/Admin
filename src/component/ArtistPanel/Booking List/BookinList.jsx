import { AiFillDelete } from "react-icons/ai";
import { useGetUteList } from "./https/useGetUteList";
import { useTransferMutation } from "./https/useTransferMutation";
import { useState } from "react";
import ManualBookingList from "./ManualBookingList";

const BookinList = () => {

  const [processingId, setProcessingId] = useState(null);
  const [activeTab, setActiveTab] = useState('stripe');
  



    const { data, isLoading } = useGetUteList();
  console.log(data)


  const { mutateAsync, isPending } = useTransferMutation(setProcessingId);

  const manualBookings = data?.data?.filter(item => item.transactionId) || [];
  const stripeBookings = data?.data?.filter(item => !item.transactionId) || [];

  const handleTransferAmount = (data) => {
    setProcessingId(data?._id);
    try {
      const values = {
        bookingId: data?._id,
        id: data?.uteBy,
      };
      mutateAsync(values).then(() => {
        setProcessingId(null);
      });
    } catch (error) {
      console.error(error);
      setProcessingId(null);
    }
  };

  const handleDeleteBooking = (id) => {
    console.log("Delete booking with id:", id);
  };

  if (isLoading) {
    return <div className="w-full p-6 text-center">Loading...</div>;
  }

  return (
    <div className="w-full p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ute Bookings</h1>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('stripe')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'stripe'
                ? 'border-purple-700 text-purple-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Stripe Payments
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'manual'
                ? 'border-purple-700 text-purple-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manual Payments
          </button>
        </nav>
      </div>

      {activeTab === 'manual' ? (
        <ManualBookingList
          data={{ data: manualBookings }} 
         
          handleDelete={handleDeleteBooking} 
          
          isPending={isPending} 
        />
      ) : (
        <>
          {stripeBookings?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No stripe bookings found</p>
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
                        "Job Booking ID",
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
                    {stripeBookings?.map((booking) => (
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
                          {`${booking?.uteBookingId}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white bg-orange-600 px-2 rounded-md tracking-tight">
                            {booking?.isTransfered ? "Transfered" : "N/A"}
                          </div>
                        </td>
                        <td className="p-2 flex justify-cente gap-3">
                          <button
                            className="bg-[#7F0284] text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                              booking?.status !== "delivered" ||
                              booking?.isTransfered === true
                            }
                            aria-disabled={booking?.status !== "delivered"}
                            onClick={() => handleTransferAmount(booking)}
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
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookinList;