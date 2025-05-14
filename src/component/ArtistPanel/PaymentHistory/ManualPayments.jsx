import { FaFileInvoice } from "react-icons/fa";
import { useAcceptPaymentMutation } from "./https/useAcceptPaymentMutation";
import { useState } from "react";
import { BASE_IMAGE_URL } from "../../utils/exports";

const ManualPayments = ({
  payments,
  formatAmount,
  formatDate,
  getStatusColor,
}) => {
  const [processingId, setProcessingId] = useState(null);
  const [activeTab, setActiveTab] = useState("ute"); 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const { mutateAsync } = useAcceptPaymentMutation();

  const handleAccept = (id) => {
    setProcessingId(id);
    mutateAsync(id).then(() => {
      setProcessingId(null);
    });
  };

  const filteredPayments = payments?.filter(
    (payment) => payment?.isJob === "true"
  );

  const filteredUtePayments = payments?.filter(
    (payment) => payment?.isJob !== "true"
  );

  const renderData = activeTab === "ute" ?  filteredUtePayments : filteredPayments


  const handleReceiptClick = (paymentImage) => {
    setSelectedReceipt(paymentImage);
    setIsOpen(true);
  };

  return (
    <>
      {/* Tabs */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveTab("ute")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "ute"
              ? "bg-[#7F0284] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Ute Payments
        </button>
        <button
          onClick={() => setActiveTab("true")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "true"
              ? "bg-[#7F0284] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Job Payments
        </button>
      </div>

  
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-medium">Payment Receipt</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {selectedReceipt ? (
                <img 
                  src={`${BASE_IMAGE_URL}/payment/${selectedReceipt}`} 
                  alt="Payment Receipt" 
                  className="w-full h-auto object-contain"
                />
              ) : (
                <p className="text-gray-500 text-center py-8">No receipt available</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {renderData?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No {activeTab} payment records found</p>
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
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Receipt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {renderData?.map((payment) => (
                  <tr key={payment?._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                      { activeTab === "true" ? payment?.uteOwnerName  : payment?.paymentBy}
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
                          payment?.status
                        )}`}
                      >
                        {payment?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-gray-700">
                        {payment?.transactionId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment?.paymentImage ? (
                        <button 
                          onClick={() => handleReceiptClick(payment.paymentImage)}
                          className="text-[#7F0284] hover:text-[#5a025e] focus:outline-none"
                        >
                          <FaFileInvoice className="text-xl" />
                        </button>
                      ) : (
                        <span className="text-gray-400">No receipt</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleAccept(payment?._id)}
                        disabled={
                          processingId === payment?._id ||
                          payment?.status === "inProgress"
                        }
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                      >
                        {processingId === payment?._id
                          ? "Loading..."
                          : payment?.status === "inProgress"
                          ? "Accepted"
                          : "Accept"}
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
  );
};

export default ManualPayments;