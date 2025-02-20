import { useEffect, useState } from "react";
import Tooltip from "../../utils/Tooltip";
import OpenModalButton from "../../utils/OpenModalBtn";
import { AiFillDelete } from "react-icons/ai";
import DeleteModal from "../../utils/DeleteModal";

import { useSelector } from "react-redux";
import { Pagination } from "../../pagination";
import LoadingPage from "../../Loader";
import { DeleteShipment } from "./https/deleteShipment";

const table_head = [
  { head: "Id" },
  { head: "Customer Name" },
  { head: "Email" },
  { head: "Phone" },
  { head: "Order Date & Time" },
  { head: "Vehicle Type" },
  { head: "Pickup Location" },
  { head: "Pickup Date & Time" },
  { head: "Drop Off Location" },
  { head: "Action" },
];

const Table = ({ shipmentData, currentPage, setCurrentPage, data }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const { token } = useSelector((state) => state.user);

  const { mutateAsync, isPending } = DeleteShipment();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setDeleteIndex(id);
  };

  const confirmDeleteshipment = async () => {
    await mutateAsync({ id: deleteIndex, token });
    setDeleteModalOpen(false);
    setDeleteIndex(null);
  };

  const confirmDelete = () => {
    const updatedData = data.filter((_, index) => index !== deleteIndex);
    setData(updatedData);
    setDeleteModalOpen(false);
  };

  return (
    <div className="rounded-lg mt-6">
      <h1 className="text-2xl mb-5 font-semibold text-[#333843] leading-7">
        All Shipments
      </h1>
      {shipmentData?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-black">
              <tr className="text-white">
                {table_head.map((item, index) => (
                  <th
                    key={index}
                    className="px-2 py-3 text-sm font-semibold text-left"
                  >
                    {item.head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shipmentData?.map((user, index) => (
                <tr key={index} className="bg-white border-b border-[#C2C2C2]">
                  <td className="p-2">
                    <p className="w-48 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                      {user.shipmentId}
                    </p>
                  </td>
                  <td className="p-2">
                    {user.quoteStatus === "half" ? (
                      <p className="text-sm w-48 overflow-hidden text-ellipsis whitespace-wrap line-clamp-2">
                        Not Available
                      </p>
                    ) : (
                      user?.contactDetail?.map((detail) =>
                        detail.collectionInfo ? (
                          <div key={detail.collectionInfo.name}>
                            <Tooltip
                              text={detail.collectionInfo.name}
                              position="top"
                            >
                              <p className="w-48 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                                {detail.collectionInfo.name
                                  ? detail.collectionInfo.name
                                  : "Not Available"}
                              </p>
                            </Tooltip>
                          </div>
                        ) : null
                      )
                    )}
                  </td>
                  <td className="p-2">
                    {user.quoteStatus === "half" ? (
                      <Tooltip text={user.email} position="top">
                        <p className="text-sm w-48 overflow-hidden  text-ellipsis whitespace-wrap line-clamp-2">
                          {user.email}
                        </p>
                      </Tooltip>
                    ) : (
                      user?.contactDetail?.map((detail) =>
                        detail.collectionInfo ? (
                          <div key={detail.collectionInfo.email}>
                            <Tooltip
                              text={detail.collectionInfo.email}
                              position="top"
                            >
                              <p className="w-48 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
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
                  <td className="p-2">
                    {user.quoteStatus === "half" ? (
                      <p className="text-sm w-48 overflow-hidden  text-ellipsis whitespace-wrap line-clamp-2">
                        Not Available
                      </p>
                    ) : (
                      user?.contactDetail?.map((detail) =>
                        detail.collectionInfo ? (
                          <div key={detail.collectionInfo.contactNumber}>
                            <Tooltip
                              text={detail.collectionInfo.contactNumber}
                              position="top"
                            >
                              <p className="w-48 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                                {detail.collectionInfo.contactNumber
                                  ? detail.collectionInfo.contactNumber
                                  : "Not Available"}
                              </p>
                            </Tooltip>
                          </div>
                        ) : null
                      )
                    )}
                  </td>
                  <td className="p-2">
                    <Tooltip text={`${user.orderDate}`} position="top">
                      <p className="w-48 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                        {`${user.orderDate}`}
                      </p>
                    </Tooltip>
                  </td>
                  <td className="p-2">
                    <Tooltip text={user.vehicleType} position="top">
                      <p className="w-48 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                        {user.vehicleType}
                      </p>
                    </Tooltip>
                  </td>
                  <td className="p-2">
                    {user.quoteStatus === "half" ? (
                      <Tooltip text={user.collectionAddress} position="top">
                        <p className="w-48 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                          {user.collectionAddress
                            ? user.collectionAddress
                            : "Not Available"}
                        </p>
                      </Tooltip>
                    ) : (
                      user?.contactDetail?.map((detail) =>
                        detail.collectionInfo ? (
                          <Tooltip
                            key={detail.collectionInfo.collectionAddress}
                            text={detail.collectionInfo.collectionAddress}
                            position="top"
                          >
                            <p className="w-48 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                              {detail.collectionInfo.collectionAddress
                                ? detail.collectionInfo.collectionAddress
                                : "Not Available"}
                            </p>
                          </Tooltip>
                        ) : null
                      )
                    )}
                  </td>
                  <td className="p-2">
                    <Tooltip text={`${user.pickUpDateAndTime}`} position="top">
                      <p className="w-40 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                        {`${
                          user.pickUpDateAndTime
                            ? user.pickUpDateAndTime
                            : "Not Available"
                        }`}
                      </p>
                    </Tooltip>
                  </td>
                  <td className="p-2">
                    {user.quoteStatus === "half" ? (
                      <p className="text-sm">
                        <p className="text-sm">{user.deliveryAddress}</p>
                      </p>
                    ) : (
                      user?.contactDetail?.map((detail) =>
                        detail.deliveryInfo ? (
                          <Tooltip
                            key={detail.deliveryInfo.deliveryAddress}
                            text={detail.deliveryInfo.deliveryAddress}
                            position="top"
                          >
                            <p className="w-48 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                              {detail.deliveryInfo.deliveryAddress
                                ? detail.deliveryInfo.deliveryAddress
                                : "Not Available"}
                            </p>
                          </Tooltip>
                        ) : null
                      )
                    )}
                  </td>
                  <td className="p-2">
                    <p className="w-16 overflow-hidden text-sm text-ellipsis whitespace-nowrap flex gap-5 item-center">
                      <button className="mt-2">
                        <OpenModalButton size={20} user={user} />
                      </button>

                      <button onClick={() => handleOpenDeleteModal(user._id)}>
                        <AiFillDelete size={20} color="#BFA75D" />
                      </button>
                      {isDeleteModalOpen && (
                        <DeleteModal
                          title="Confirm Delete"
                          onClose={() => setDeleteModalOpen(false)}
                          onConfirm={confirmDeleteshipment}
                        >
                          <p>Are you sure you want to delete this item?</p>
                        </DeleteModal>
                      )}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p className="flex items-center text-gray-700">
            Shipment list is empty
          </p>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={data?.paginationData?.totalPages}
        totalCount={data?.totalCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
