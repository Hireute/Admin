import { useState } from "react";
import { AiFillDelete, AiOutlineLoading3Quarters } from "react-icons/ai";

import { useGetJobList } from "./https/useGetJobList";
import { useTransferMutation } from "./https/useTransferMutation";

const JobBookingList = () => {
  const { data, isLoading } = useGetJobList();
  const [processingId, setProcessingId] = useState(null);
  const { mutateAsync, isPending } = useTransferMutation();

  const handleTransferAmount = (data) => {
    setProcessingId(data?._id);
    try {
      const values = {
        bookingId: data?._id,
        id: data?.uteBy,
      };
      console.log(values);
      mutateAsync(values).then(() => {
        setProcessingId(null);
      });
    } catch (error) {
      console.error(error);
      setProcessingId(null);
    }
  };

  const [bookings, setBookings] = useState({
    data: [
      {
        actualAmount: 275,
        amount: 200,
        bookingBy: "Darshan User",
        dropAddress: {
          postalCode: "3004",
          state: "Victoria",
          street: "Elizabeth Street",
        },
        pickupAddress: {
          postalCode: "3004",
          state: "Victoria",
          street: "Degraves Street",
        },
        requestAmount: 250,
        status: "delivered",
        uteName: "Toyato Heliux",
        _id: "67f8cdbae254538f40a0cfbc",
      },
    ],
    current: 1,
    totalCount: 1,
    pagination: {
      hasNext: false,
      hasPrevious: false,
      next: 0,
      page: 1,
      previous: 0,
      totalPages: 1,
    },
    message: "UTE bookings retrieved successfully.",
  });

  const handleDelete = (id) => {
    setBookings((prev) => ({
      ...prev,
      data: prev.data.filter((booking) => booking._id !== id),
      totalCount: prev.totalCount - 1,
    }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "inProgress":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Bookings</h1>
      </div>

      {isLoading && !bookings?.data?.length ? (
        <div className="flex justify-center items-center h-64">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-purple-700" />
        </div>
      ) : data?.data?.length === 0 ? (
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
                    Is-Transfered
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.data?.map((booking) => (
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
                      {/* {booking?.actualAmount !== booking?.amount && (
                        <div className="text-xs text-gray-500">
                          Actual: ${booking?.actualAmount}
                        </div>
                      )} */}
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
                      <div className="text-sm text-white bg-orange-600 px-2  rounded-md tracking-tight">
                        {booking?.isTransfered === true ? "Transfered" : "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className={`bg-[#7F0284] text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed  ${booking?.isTransfered === true  ? "pointer-events-none opacity-50"  :""}`}
                          disabled={
                            booking?.status !== "delivered" 
                            
                          }
                          aria-disabled={booking?.status !== "delivered" || booking?.isTransfered === true}
                          onClick={() => handleTransferAmount(booking)}
                        >
                          {processingId === booking._id ? (
                            <div className="flex items-center">
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
                        <button
                          onClick={() => handleDelete(booking?._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <AiFillDelete className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobBookingList;
