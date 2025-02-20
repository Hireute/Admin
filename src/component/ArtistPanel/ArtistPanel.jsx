import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import React from "react";
import Shipment from "./Shipment/Shipment";
import Dashboard from "./Dashboard/Dashboard";
import FaqForm from "./Faq/Faq";
import Request from "./Shipment/Request";
import JobList from "./JobList/JobList";
import BlogPost from "./BlogPost/BlogPost";
import UsersList from "./UsersList/UsersList";
import BookinList from "./Booking List/BookinList";
import PaymenetHistory from "./PaymentHistory/PaymenetHistory";
import ChangePassword from "./ChangePassword/ChangePassword";

const ArtistPanel = () => {
  return (
    <div className="flex w-full min-h-screen bg-gray-200">
      <div className="xl:w-[15%] lg:w-[20%] md:w-[10%] sm:w-[10%] w-[20%]">
        <Sidebar />
      </div>
      <div className="xl:w-[80%] lg:w-[78%] md:w-[88%] sm:w-[85%] w-[78%] container mx-auto mt-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="ute-list" element={<Shipment />} />
          <Route path="job-list" element={<JobList />} />
          <Route path="booking-list" element={<BookinList />} />
          <Route path="quotes" element={<Request />} />
          <Route path="faq" element={<FaqForm />} />
          <Route path="blogs" element={<BlogPost />} />
          <Route path="payment-history" element={<PaymenetHistory />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="all-users" element={<UsersList />} />
        </Routes>
      </div>
    </div>
  );
};

export default ArtistPanel;
