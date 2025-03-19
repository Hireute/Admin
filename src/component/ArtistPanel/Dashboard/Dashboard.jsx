import { TbTruckDelivery } from "react-icons/tb";
import { MdHomeRepairService } from "react-icons/md";
import { FaBoxes, FaTruck, FaUsers } from "react-icons/fa";
import Table from "./Table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetAllShipmentData } from "./https/GetShipmentData";
import LoadingPage from "../../Loader";
import axios from "axios";
import { reportDatas } from "../../../services/apis";

const stats = [
  {
    label: "Shipment",
    value: 1250,
    dash: <FaBoxes size={20} />,
  },
  { label: "Vehicles", value: 5200, dash: <TbTruckDelivery size={20} /> },
  // { label: "Services", value: 5130, dash: <MdHomeRepairService size={20} /> },
];

const Dashboard = () => {
  const { token } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [shipmentData, setShipmentData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const ITEMS_PER_PAGE = 10;

  // Fetch shipment data
  const { data, isLoading, isError, error } = GetAllShipmentData({
    token,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (data) {
      setShipmentData(data?.data);
      setCurrentPage(data.paginationData.page);
    }
  }, [data]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(reportDatas.ADMIN_ReportData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setReportData(response.data);
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  // if (isError) {
  //   return <p>{error?.response?.data?.message || "Error fetching data"}</p>;
  // }
  return (
    <>
      {/* <div className="xl:w-[70%] w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-6 rounded-3xl">
        <div className="px-5 lg:px-10 py-6 sm:py-8 border bg-white border-gray-200 shadow-xl rounded-md flex gap-4 items-center">
          <p className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <FaBoxes size={20} />
          </p>
          <div className="">
            <p className="text-md sm:text-lg text-[#6797ff] font-medium leading-5">
              Shipment
            </p>
            <h2 className="text-lg sm:text-2xl font-semibold text-[#12223D]">
              {reportData.totalShipment}
            </h2>
          </div>
        </div>
        <div className="px-5 lg:px-10 py-6 sm:py-8 border bg-white border-gray-200 shadow-xl rounded-md flex gap-4 items-center">
          <p className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <TbTruckDelivery size={20} />
          </p>
          <div className="">
            <p className="text-md sm:text-lg text-[#6797ff] font-medium leading-5">
              Vehicles
            </p>
            <h2 className="text-lg sm:text-2xl font-semibold text-[#12223D]">
              {reportData.totalVehical}
            </h2>
          </div>
        </div>
      </div>
      <>
        <Table
          shipmentData={shipmentData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          data={data}
        />
      </> */}
      <div className="xl:w-[70%] w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-6 rounded-3xl">
        <div className="px-5 lg:px-10 py-6 sm:py-8 border bg-white border-gray-200 shadow-xl rounded-md flex gap-4 items-center">
          <p className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <FaUsers size={20} />
          </p>
          <div className="">
            <p className="text-md sm:text-lg text-[#6797ff] font-medium leading-5">
              Total Ute Users
            </p>
            <h2 className="text-lg sm:text-2xl font-semibold text-[#12223D]">
              {/* {reportData.totalShipment} */}2
            </h2>
          </div>
        </div>
        <div className="px-5 lg:px-10 py-6 sm:py-8 border bg-white border-gray-200 shadow-xl rounded-md flex gap-4 items-center">
          <p className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <FaTruck size={20} />
          </p>
          <div className="">
            <p className="text-md sm:text-lg text-[#6797ff] font-medium leading-5">
              Total Posted Ute
            </p>
            <h2 className="text-lg sm:text-2xl font-semibold text-[#12223D]">
              {/* {reportData.totalVehical} */}2
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
