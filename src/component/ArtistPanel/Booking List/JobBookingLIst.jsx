import React, { useState } from 'react';
import { AiFillDelete, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useGetJobList } from './https/useGetJobList';

const JobBookingList = () => {


  const {data , isLoading} = useGetJobList()

  const [bookings, setBookings] = useState({
    data: [
      {
        actualAmount: 275,
        amount: 200,
        bookingBy: "Darshan User",
        dropAddress: {
          postalCode: "3004",
          state: "Victoria",
          street: "Elizabeth Street"
        },
        pickupAddress: {
          postalCode: "3004",
          state: "Victoria",
          street: "Degraves Street"
        },
        requestAmount: 250,
        status: "delivered",
        uteName: "Toyato Heliux",
        _id: "67f8cdbae254538f40a0cfbc"
      }
    ],
    current: 1,
    totalCount: 1,
    pagination: {
      hasNext: false,
      hasPrevious: false,
      next: 0,
      page: 1,
      previous: 0,
      totalPages: 1
    },
    message: "UTE bookings retrieved successfully."
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    setBookings(prev => ({
      ...prev,
      data: prev.data.filter(booking => booking._id !== id),
      totalCount: prev.totalCount - 1
    }));
  };

  const onSubmit = (data) => {
    setIsLoading(true);
   
    setTimeout(() => {
      if (editingBooking) {
        
        setBookings(prev => ({
          ...prev,
          data: prev.data.map(booking => 
            booking._id === editingBooking._id ? { ...booking, ...data } : booking
          )
        }));
      } else {
        
        const newBooking = {
          ...data,
          _id: Date.now().toString(),
          dropAddress: {
            street: data.dropStreet,
            state: data.dropState,
            postalCode: data.dropPostalCode
          },
          pickupAddress: {
            street: data.pickupStreet,
            state: data.pickupState,
            postalCode: data.pickupPostalCode
          }
        };
        setBookings(prev => ({
          ...prev,
          data: [...prev.data, newBooking],
          totalCount: prev.totalCount + 1
        }));
      }
      setIsLoading(false);
      setIsModalOpen(false);
      reset();
      setEditingBooking(null);
    }, 1000);
  };

  const formatAddress = (address) => {
    return `${address?.street}, ${address?.state} ${address?.postalCode}`;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'inProgress':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Bookings</h1>
        {/* <button
          onClick={() => {
            setEditingBooking(null);
            setIsModalOpen(true);
          }}
          className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add Booking
        </button> */}
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
                    User
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
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Pickup Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Drop Address
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.data?.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.bookingBy}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.uteName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${booking.amount}
                      </div>
                      {booking.actualAmount !== booking.amount && (
                        <div className="text-xs text-gray-500">
                          Actual: ${booking.actualAmount}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.createdAt}
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatAddress(booking.pickupAddress)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatAddress(booking.dropAddress)}
                      </div>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(booking)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingBooking ? 'Edit Booking' : 'Add New Booking'}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      User Name
                    </label>
                    <input
                      type="text"
                      defaultValue={editingBooking?.bookingBy || ''}
                      {...register("bookingBy", { required: "User name is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.bookingBy && (
                      <p className="mt-1 text-sm text-red-600">{errors.bookingBy.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ute Name
                    </label>
                    <input
                      type="text"
                      defaultValue={editingBooking?.uteName || ''}
                      {...register("uteName", { required: "Ute name is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.uteName && (
                      <p className="mt-1 text-sm text-red-600">{errors.uteName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      defaultValue={editingBooking?.amount || ''}
                      {...register("amount", { required: "Amount is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Actual Amount ($)
                    </label>
                    <input
                      type="number"
                      defaultValue={editingBooking?.actualAmount || ''}
                      {...register("actualAmount", { required: "Actual amount is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.actualAmount && (
                      <p className="mt-1 text-sm text-red-600">{errors.actualAmount.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      defaultValue={editingBooking?.status || ''}
                      {...register("status", { required: "Status is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {errors.status && (
                      <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Pickup Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street
                      </label>
                      <input
                        type="text"
                        defaultValue={editingBooking?.pickupAddress?.street || ''}
                        {...register("pickupStreet", { required: "Street is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      {errors.pickupStreet && (
                        <p className="mt-1 text-sm text-red-600">{errors.pickupStreet.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        defaultValue={editingBooking?.pickupAddress?.state || ''}
                        {...register("pickupState", { required: "State is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      {errors.pickupState && (
                        <p className="mt-1 text-sm text-red-600">{errors.pickupState.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        defaultValue={editingBooking?.pickupAddress?.postalCode || ''}
                        {...register("pickupPostalCode", { required: "Postal code is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      {errors.pickupPostalCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.pickupPostalCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Drop Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street
                      </label>
                      <input
                        type="text"
                        defaultValue={editingBooking?.dropAddress?.street || ''}
                        {...register("dropStreet", { required: "Street is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      {errors.dropStreet && (
                        <p className="mt-1 text-sm text-red-600">{errors.dropStreet.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        defaultValue={editingBooking?.dropAddress?.state || ''}
                        {...register("dropState", { required: "State is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      {errors.dropState && (
                        <p className="mt-1 text-sm text-red-600">{errors.dropState.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        defaultValue={editingBooking?.dropAddress?.postalCode || ''}
                        {...register("dropPostalCode", { required: "Postal code is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      {errors.dropPostalCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.dropPostalCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingBooking(null);
                      reset();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobBookingList;