import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useGetUteList } from "./https/useGetUteList";

const BookinList = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const { data, isLoading } = useGetUteList();
  const bookings = data?.data || [];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    // Here you would typically make an API call to update or create a booking
    // For now, we'll just log the data
    console.log("Form submitted:", formData);
    reset();
    setEditingId(null);
    setAddModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(URL.createObjectURL(file));
    }
  };

  const handleEditBooking = (id) => {
    const booking = bookings.find((booking) => booking._id === id);
    if (booking) {
      setValue("bookingBy", booking.bookingBy);
      setValue("uteName", booking.uteName);
      setValue("amount", booking.amount);
      setValue("actualAmount", booking.actualAmount);
      setValue("requestAmount", booking.requestAmount);
      setValue("status", booking.status);
      setValue("pickupAddress", `${booking.pickupAddress.street}, ${booking.pickupAddress.state} ${booking.pickupAddress.postalCode}`);
      setValue("dropAddress", `${booking.dropAddress.street}, ${booking.dropAddress.state} ${booking.dropAddress.postalCode}`);
      setEditingId(id);
      setAddModalOpen(true);
    }
  };

  const handleDeleteBooking = (id) => {
    // Here you would typically make an API call to delete the booking
    console.log("Delete booking with id:", id);
  };

  if (isLoading) {
    return <div className="w-full p-6 text-center">Loading...</div>;
  }

  return (
    <div className="w-full p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Bookings</h1>
        {/* <button
          className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] font-semibold py-2 px-4 rounded-md"
          onClick={() => setAddModalOpen(true)}
        >
          Add Booking
        </button> */}
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8">No bookings found</div>
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
                "Actions",
              ].map((heading, index) => (
                <th key={index} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50 transition-colors text-center">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate">{booking.bookingBy}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{booking.uteName}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">${booking.amount}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">${booking.actualAmount}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">${booking.requestAmount}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    booking.status === 'delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                  {`${booking?.pickupAddress?.street}, ${booking?.pickupAddress?.state} ${booking?.pickupAddress?.postalCode}`}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                  {`${booking?.dropAddress?.street}, ${booking?.dropAddress?.state} ${booking?.dropAddress?.postalCode}`}
                </td>
                <td className="p-2 flex justify-center">
                  <FaEdit
                    onClick={() => handleEditBooking(booking._id)}
                    className="text-[#7F0284] text-2xl mr-2 cursor-pointer"
                  />
                  <AiFillDelete
                    onClick={() => handleDeleteBooking(booking._id)}
                    className="text-red-600 text-2xl cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            style={{ overflow: "auto", height: "600px" }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingId !== null ? "Edit Booking" : "Add New Booking"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("bookingBy", { required: "User name is required" })}
                placeholder="Enter user name"
              />
              {errors.bookingBy && (
                <div className="text-red-500">{errors.bookingBy.message}</div>
              )}

              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("uteName", {
                  required: "Ute name is required",
                })}
                placeholder="Enter ute name"
              />
              {errors.uteName && (
                <div className="text-red-500">{errors.uteName.message}</div>
              )}

              <input
                type="number"
                className="w-full p-2 border rounded mb-3"
                {...register("amount", {
                  required: "Amount is required",
                })}
                placeholder="Enter amount"
              />
              {errors.amount && (
                <div className="text-red-500">{errors.amount.message}</div>
              )}

              <input
                type="number"
                className="w-full p-2 border rounded mb-3"
                {...register("actualAmount", {
                  required: "Actual amount is required",
                })}
                placeholder="Enter actual amount"
              />
              {errors.actualAmount && (
                <div className="text-red-500">{errors.actualAmount.message}</div>
              )}

              <input
                type="number"
                className="w-full p-2 border rounded mb-3"
                {...register("requestAmount", {
                  required: "Request amount is required",
                })}
                placeholder="Enter request amount"
              />
              {errors.requestAmount && (
                <div className="text-red-500">{errors.requestAmount.message}</div>
              )}

              <select
                className="w-full p-2 border rounded mb-3"
                {...register("status", {
                  required: "Status is required",
                })}
              >
                <option value="">Select status</option>
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {errors.status && (
                <div className="text-red-500">{errors.status.message}</div>
              )}

              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("pickupAddress", {
                  required: "Pickup address is required",
                })}
                placeholder="Enter pickup address"
              />
              {errors.pickupAddress && (
                <div className="text-red-500">{errors.pickupAddress.message}</div>
              )}

              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                {...register("dropAddress", {
                  required: "Drop address is required",
                })}
                placeholder="Enter drop address"
              />
              {errors.dropAddress && (
                <div className="text-red-500">{errors.dropAddress.message}</div>
              )}

              <input
                type="file"
                className="w-full p-2 border rounded mb-3"
                onChange={handleImageChange}
              />

              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] text-white py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookinList;