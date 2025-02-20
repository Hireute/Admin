import React, { useEffect, useState } from "react";
import halfForm from "../../json/halfForm";
import Tooltip from "../../utils/Tooltip";
import { useSelector } from "react-redux";
import { GetRequestData } from "./https/GetRequistList";
import LoadingPage from "../../Loader";
import { Pagination } from "../../pagination";
import { requestendpoints } from "../../../services/apis";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const tableHead = [
  { head: "Id" },
  { head: "Email" },
  { head: "Vehicle Type" },
  { head: "Order Date & Time" },
  { head: "Pickup Date & Time" },
  { head: "From" },
  { head: "To" },
  { head: "Note" },
  { head: "Actions" },
];

const Request = () => {
  const { token } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const { data, isLoading, isError, error } = GetRequestData({
    token,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [quoteIdToReject, setQuoteIdToReject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const [currentRequest, setCurrentRequest] = useState({
    id: null,
    email: null,
  });

  const openModal = (id, email) => {
    setIsModalOpen(true);
    setCurrentRequest({ id, email });
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = () => {
    const { id, email } = currentRequest;
    handleSendEmail(id, email, price);
    closeModal();
  };

  const handleSendEmail = async (id, email, price) => {
    try {
      const response = await axios.post(
        `${requestendpoints.Send_Email_Quote}/${id}`,
        { email: email, price: price },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowConfirmModal(false);
      toast.success("Price sent successfully!");
    } catch (error) {
      setShowConfirmModal(false);
    }
  };

  const handleRejectQuote = async (id) => {
    try {
      const response = await axios.delete(
        `${requestendpoints.Reject_Quote}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowConfirmModal(false);
      toast.success("Quote rejected successfully!");
      window.location.reload();
    } catch (error) {
      setShowConfirmModal(false);
    }
  };

  const handleAcceptQuote = async (id) => {
    try {
      const response = await axios.put(
        `${requestendpoints.Accept_Quote}/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/shipment");
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (data) {
      setCurrentPage(data.paginationData.page);
    }
  }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <p>{error?.response?.data?.message}</p>;
  }

  const ConfirmRejectModal = ({ isOpen, onClose, onConfirm, id }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Are you sure you want to reject this quote?
          </h3>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md mr-2"
              onClick={() => onConfirm(id)}
            >
              Confirm
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-full p-4">
        <h1 className="text-3xl font-semibold mb-6 text-[#1D3557]">Quotes</h1>
        {data?.data?.length > 0 ? (
          <div>
            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="table-auto bg-white w-full border-collapse border border-gray-300 rounded-lg">
                <thead className="bg-black text-white text-left">
                  <tr>
                    {tableHead.map((item, index) => (
                      <th
                        key={index}
                        className="px-4 py-4 text-sm font-semibold text-center"
                      >
                        {item.head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((request, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-300 hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 text-[#12223D] font-normal">
                        <Tooltip text={request.shipmentId} position="top">
                          <p className="w-20 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                            {request.shipmentId}
                          </p>
                        </Tooltip>
                      </td>
                      <td className="px-4 py-4 text-[#12223D] font-normal">
                        {request.quoteStatus === "half" ? (
                          <p className="w-40 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                            {request.email}
                          </p>
                        ) : (
                          request?.contactDetail?.map((detail) =>
                            detail.collectionInfo ? (
                              <div key={detail.collectionInfo.email}>
                                <Tooltip
                                  text={detail.collectionInfo.email}
                                  position="top"
                                >
                                  <p className="w-56 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                                    {detail.collectionInfo.email
                                      ? detail.collectionInfo.email
                                      : "Not Available"}
                                  </p>
                                </Tooltip>
                              </div>
                            ) : null
                          )
                        )}
                      </td>
                      <td className="px-4 py-4 text-[#12223D] font-normal">
                        <Tooltip text={request.vehicleType} position="top">
                          <p className="w-24 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                            {request.vehicleType}
                          </p>
                        </Tooltip>
                      </td>
                      <td className="px-4 py-4">
                        <Tooltip text={request.orderDate} position="top">
                          <p className="w-32 text-sm text-ellipsis whitespace-nowrap">
                            {request.orderDate}
                          </p>
                        </Tooltip>
                      </td>
                      <td className="px-4 py-4">
                        <Tooltip
                          text={request.pickUpDateAndTime}
                          position="top"
                        >
                          <p className="w-32 text-sm text-ellipsis whitespace-nowrap">
                            {request.pickUpDateAndTime}
                          </p>
                        </Tooltip>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {request.quoteStatus === "half" ? (
                          <p className="w-40 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                            {request.collectionAddress}
                          </p>
                        ) : (
                          request?.contactDetail?.map((detail) =>
                            detail.collectionInfo ? (
                              <div
                                key={detail.collectionInfo.collectionAddress}
                              >
                                <Tooltip
                                  text={detail.collectionAddress}
                                  position="top"
                                >
                                  <p className="w-56 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                                    {detail.collectionInfo.collectionAddress
                                      ? detail.collectionInfo.collectionAddress
                                      : "Not Available"}
                                  </p>
                                </Tooltip>
                              </div>
                            ) : null
                          )
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {request.quoteStatus === "half" ? (
                          <p className="w-40 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                            {request.deliveryAddress}
                          </p>
                        ) : (
                          request?.contactDetail?.map((detail) =>
                            detail.deliveryInfo ? (
                              <div key={detail.deliveryInfo.deliveryAddress}>
                                <Tooltip
                                  text={detail.deliveryAddress}
                                  position="top"
                                >
                                  <p className="w-56 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                                    {detail.deliveryInfo.deliveryAddress
                                      ? detail.deliveryInfo.deliveryAddress
                                      : "Not Available"}
                                  </p>
                                </Tooltip>
                              </div>
                            ) : null
                          )
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Tooltip text={request.notes} position="top">
                          <p className="w-44 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                            {request.notes}
                          </p>
                        </Tooltip>
                      </td>
                      <td className="px-1 py-2 flex gap-2 mt-3">
                        <button
                          className=" bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition duration-200"
                          onClick={() => handleAcceptQuote(request._id)}
                          style={{ padding: "5px 14px" }}
                        >
                          Accept
                        </button>
                        <button
                          className=" bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition duration-200"
                          onClick={() => {
                            setQuoteIdToReject(request._id);
                            setShowConfirmModal(true);
                          }}
                          style={{ padding: "5px 14px" }}
                        >
                          Reject
                        </button>
                        <button
                          className=" bg-[#BFA75D] text-white text-sm rounded-md hover:bg-[#BFA75D] transition duration-200 "
                          style={{ padding: "5px 14px", width: "100px" }}
                          onClick={() => openModal(request._id, request.email)}
                        >
                          Send Price
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={data?.paginationData?.totalPages}
              totalCount={data?.totalCounts}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <div className="flex justify-center text-gray-700">
            <p>No requests available</p>
          </div>
        )}
      </div>

      <ConfirmRejectModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleRejectQuote}
        id={quoteIdToReject}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl mb-4">Enter Price</h2>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#BFA75D] text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Request;
