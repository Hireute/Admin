import { useState } from "react";
import { AiFillDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useGetPaymentHistory } from "./https/useGetPaymentHistory";

const PaymentHistory = () => {
  const { data: paymentData, isLoading } = useGetPaymentHistory();
  const payments = paymentData?.data || [];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    // Here you would typically make an API call to update or create a payment
    console.log("Form submitted:", formData);
    reset();
    setEditingPayment(null);
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(URL.createObjectURL(file));
    }
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setValue("paymentBy", payment.paymentBy);
    setValue("amount", payment.amount);
    setValue("status", payment.status);
    setIsModalOpen(true);
  };

  const handleDeletePayment = (id) => {
    // Here you would typically make an API call to delete the payment
    console.log("Delete payment with id:", id);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'aud'
    }).format(amount / 100);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment History</h1>
        {/* <button
          className="bg-[#7F0284] hover:bg-[#FEE0FF] text-white hover:text-[#7F0284] font-semibold py-2 px-4 rounded-md"
          onClick={() => {
            setEditingPayment(null);
            setIsModalOpen(true);
          }}
        >
          Add Payment
        </button> */}
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No payment records found</p>
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
                    Status
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Receipt
                  </th> */}
                  {/* <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.paymentBy}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatAmount(payment.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <button className="text-purple-600 hover:text-purple-900 underline">
                          View Receipt
                        </button>
                      </div>
                    </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end ">
                        <button
                          onClick={() => handleEditPayment(payment)}
                          className="text-[#7F0284] hover:text-[#FEE0FF]"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeletePayment(payment._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <AiFillDelete className="h-5 w-5" />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingPayment ? 'Edit Payment' : 'Add New Payment'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  {...register("paymentBy", { required: "User name is required" })}
                  placeholder="Enter user name"
                />
                {errors.paymentBy && (
                  <p className="mt-1 text-sm text-red-600">{errors.paymentBy.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (in cents)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  {...register("amount", { 
                    required: "Amount is required",
                    min: {
                      value: 1,
                      message: "Amount must be at least 1 cent"
                    }
                  })}
                  placeholder="Enter amount in cents"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full p-2 border rounded"
                  {...register("status", { required: "Status is required" })}
                >
                  <option value="">Select status</option>
                  <option value="succeeded">Succeeded</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Receipt Image
                </label>
                <input
                  type="file"
                  className="w-full p-2 border rounded"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingPayment(null);
                    reset();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#7F0284] hover:bg-[#FEE0FF] hover:text-[#7F0284]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;