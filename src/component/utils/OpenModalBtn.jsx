import { useState } from "react";
import { IoEye } from "react-icons/io5";
import CommonModal from "./CommonModal";

const OpenModalButton = ({ user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <button onClick={openModal}>
        <IoEye size={16} color="#BFA75D" />
      </button>

      <CommonModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="h-[60vh]">
          <h1 className="text-2xl font-semibold text-center mb-10">
            Customer Details
          </h1>
          <div className="space-y-4">
            <p className="w-full flex gap-5">
              <strong className="!w-[25%]">ID:</strong>
              <span> {user.shipmentId}</span>
            </p>
            <p className="w-full flex gap-5">
              <strong className="!w-[25%]">Name:</strong>
              {user.status === "accept"
                ? "Not Available"
                : user?.contactDetail?.map((detail) =>
                    detail.collectionInfo ? (
                      <div key={detail.collectionInfo.name}>
                        <span>{detail.collectionInfo.name}</span>
                      </div>
                    ) : null
                  )}
            </p>
            <p className="w-full flex gap-5">
              <strong className="!w-[25%]">Email:</strong>
              {user.status === "accept"
                ? user.email
                : user?.contactDetail?.map((detail) =>
                    detail.collectionInfo ? (
                      <div key={detail.collectionInfo.email}>
                        <span>{detail.collectionInfo.email}</span>
                      </div>
                    ) : null
                  )}
            </p>
            <p className="w-full flex gap-5">
              <strong className="!w-[25%]">Phone:</strong>
              {user.status === "accept"
                ? "Not Available"
                : user?.contactDetail?.map((detail) =>
                    detail.collectionInfo ? (
                      <div key={detail.collectionInfo.contactNumber}>
                        <span>{detail.collectionInfo.contactNumber}</span>
                      </div>
                    ) : null
                  )}
            </p>
            <p className="w-full flex gap-5">
              <strong className="!w-[25%]">Order Date:</strong>
              <span>
                {user.orderDate} {user.orderTime}
              </span>
            </p>
            <p className="w-full flex gap-5">
              <strong className="!w-[25%]">Vehicle Type:</strong>
              <span> {user.vehicleType}</span>
            </p>
            <p className="w-full flex gap-5">
              <strong className="!w-[25%]">Pickup Location:</strong>
              {user.status === "accept"
                ? "Not Available"
                : user?.contactDetail?.map((detail) =>
                    detail.collectionInfo ? (
                      <div key={detail.collectionInfo.collectionAddress}>
                        <span>{detail.collectionInfo.collectionAddress}</span>
                      </div>
                    ) : null
                  )}
              {/* {user?.contactDetail?.map((detail) =>
                detail.collectionInfo ? (
                  <div key={detail.collectionInfo.collectionAddress}>
                    <span>{detail.collectionInfo.collectionAddress}</span>
                  </div>
                ) : null
              )} */}
            </p>
            <p className="w-full flex gap-5">
              <strong className="!w-[25%]">Pickup Date & Time:</strong>
              <span> {user.pickUpDateAndTime}</span>
            </p>
            <p className="w-full flex gap-5">
              <strong className="!w-[25%]">Drop Off Location:</strong>
              <span> {user.deliveryAddress}</span>
            </p>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default OpenModalButton;
