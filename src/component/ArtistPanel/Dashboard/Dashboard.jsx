import { FaBoxes, FaTruck, FaUsers, FaUserCheck, FaUserTimes, FaCalendarCheck, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GetAllShipmentData } from "./https/GetShipmentData";
import Loader from "../../utils/Loader";

const Dashboard = () => {
  const { data, isLoading, isError, error } = GetAllShipmentData();

  if (isLoading) {
    return <Loader/>
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error loading dashboard data: {error?.message}</p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: data?.totalUser || 0,
      icon: <FaUsers className="text-white" size={20} />,
      bgColor: "bg-[#7F0284]",
      link: "all-users"
    },
    {
      title: "Active Users",
      value: data?.totalActiveUser || 0,
      icon: <FaUserCheck className="text-white" size={20} />,
      bgColor: "bg-[#4CAF50]",
      link: "all-users"
    },
    {
      title: "Inactive Users",
      value: data?.totalDeactiveUser || 0,
      icon: <FaUserTimes className="text-white" size={20} />,
      bgColor: "bg-[#F44336]",
      link: "all-users"
    },
    {
      title: "Total Posted Utes",
      value: data?.totalUtedata || 0,
      icon: <FaTruck className="text-white" size={20} />,
      bgColor: "bg-[#2196F3]",
      link: "ute-list"
    },
    {
      title: "Total Jobs",
      value: data?.totalJobdata || 0,
      icon: <FaBriefcase className="text-white" size={20} />,
      bgColor: "bg-[#FF9800]",
      link: "job-list"
    },
    {
      title: "Ute Bookings",
      value: data?.totalUteBooking || 0,
      icon: <FaCalendarCheck className="text-white" size={20} />,
      bgColor: "bg-[#9C27B0]",
      link: "booking-list"
    },
    {
      title: "Job Bookings",
      value: data?.totalJobBooking || 0,
      icon: <FaBoxes className="text-white" size={20} />,
      bgColor: "bg-[#607D8B]",
      link: "job-booking-list"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#7F0284]">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link 
            to={stat?.link} 
            key={index}
            className="group transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className={`p-4 ${stat?.bgColor} flex justify-between items-center`}>
                <div className="p-3 rounded-lg bg-white bg-opacity-20">
                  {stat?.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{stat?.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-3xl font-bold text-gray-800">{stat?.value}</p>
                <div className="mt-2 h-1 w-full bg-gray-200 rounded-full">
                  <div 
                    className={`h-1 rounded-full ${stat?.bgColor}`} 
                    style={{ width: `${Math.min(100, (stat?.value / 10) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;