import React, { useState, useMemo } from 'react';
import { 
  FaUser,
  FaArrowLeft,
  FaSignInAlt,
  FaSignOutAlt,
  FaCalendarAlt,
  FaChevronDown,
  FaCar,
  FaStickyNote,
  FaFilter,
  FaTimes
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserActivity } from './https/useGetUserActivity';
import { FaTicket } from 'react-icons/fa6';

const ActivityLog = () => {
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('latest'); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: userActivity, isLoading: activityLoading, isFetching } = useGetUserActivity(id);

  console.log(userActivity);

  // Get available dates from the data
  const availableDates = useMemo(() => {
    if (!userActivity?.data) return [];
    return userActivity.data.map(item => ({
      date: item.date,
      count: item.activities?.length || 0
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [userActivity]);

  // Filter activities based on selected date
  const filteredActivities = useMemo(() => {
    if (!userActivity?.data) return [];
    
    if (selectedDate === 'all') {
      return userActivity.data;
    } else if (selectedDate === 'latest') {
      // Show only the most recent date
      return userActivity.data.slice(0, 1);
    } else {
      // Show specific date
      return userActivity.data.filter(item => item.date === selectedDate);
    }
  }, [userActivity, selectedDate]);

  const getActivityIcon = (activityType) => {
    switch (activityType) {
      case 'logged-in':
        return <FaSignInAlt className="text-emerald-600" />; 
      case 'logged-out':
        return <FaSignOutAlt className="text-gray-500" />; 
      case 'add-ute':
        return <FaCar className="text-yellow-600" />; 
      case 'add-job':
        return <FaStickyNote className="text-indigo-600" />; 
      case 'create-ute-booking':
        return <FaTicket className="text-purple-600" />; 
      default:
        return <FaUser className="text-slate-500" />; 
    }
  };

  const getActivityColor = (activityType) => {
    switch (activityType) {
      case 'logged-in':
        return 'bg-emerald-100 text-emerald-700'; 
      case 'logged-out':
        return 'bg-gray-100 text-gray-700'; 
      case 'add-ute':
        return 'bg-yellow-100 text-yellow-700'; 
      case 'add-job':
        return 'bg-indigo-100 text-indigo-700'; 
      case 'create-ute-booking':
        return 'bg-purple-100 text-purple-700'; 
      default:
        return 'bg-slate-100 text-slate-700'; 
    }
  };

  const formatDateString = (dateString) => {
    return dateString;
  };

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBackClick = () => {
    navigate("/all-users");
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  if (activityLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!userActivity || !userActivity.data || userActivity.data.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={handleBackClick}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to all activities
        </button>
        <div className="text-center py-10 text-gray-500">
          No activities found for this user
        </div>
      </div>
    );
  }


  const getUserInfo = () => {
    for (const dayData of userActivity.data) {
      if (dayData.activities && dayData.activities.length > 0) {
        const firstActivity = dayData.activities[0];
        const activityData = Object.values(firstActivity).find(item => item && item.activityBy);
        if (activityData?.activityBy) {
          const user = activityData.activityBy;
          return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User';
        }
      }
    }
    return 'Unknown User';
  };

  const userName = getUserInfo();

  const getActivityDescription = (activityType, userName) => {
    switch (activityType?.activity) {
      case 'logged-in':
        return `${userName} logged in to the system.`;
      case 'logged-out':
        return `${userName} logged out of the system.`;
      case 'add-ute':
        return (
          <>
            {userName} added a ute: <strong>{activityType?.activityTo?.uteName}</strong> (ID: {activityType?.activityTo?.uteId}).
          </>
        );
      case 'add-job':
        return (
          <>
            {userName} added a job: <strong>{activityType?.activityTo?.jobName}</strong> (ID: {activityType?.activityTo?.jobId}).
          </>
        );
      case 'create-ute-booking':
        return (
          <>
            {userName} booked the ute <strong>{activityType?.activityTo?.uteName}</strong> for ${activityType?.activityTo?.amount}.
          </>
        );
      default:
        return `${userName} performed the activity: ${activityType?.activity}.`;
    }
  };

  const getTotalActivities = () => {
    return filteredActivities.reduce((total, dayData) => total + (dayData.activities?.length || 0), 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md max-h-screen overflow-y-auto">
     <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
  {/* Back Button */}
  <button
    onClick={handleBackClick}
    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
  >
    <FaArrowLeft className="mr-2" />
    Back
  </button>

  {/* User Info */}
  <div className="flex items-center space-x-3 flex-1 min-w-[250px]">
    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
      <FaUser className="text-gray-600" />
    </div>
    <div>
      <h2 className="text-xl font-bold text-gray-800">{userName}'s Activities</h2>
      <p className="text-sm text-gray-600">
        {getTotalActivities()} {getTotalActivities() === 1 ? 'activity' : 'activities'}{' '}
        {selectedDate === 'latest' && '(Latest)'}
        {selectedDate !== 'latest' && selectedDate !== 'all' && ` on ${formatDisplayDate(selectedDate)}`}
      </p>
    </div>
  </div>

  {/* Date Filter */}
  <div className="relative">
    <button
      onClick={() => setShowDatePicker(!showDatePicker)}
      className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
    >
      <FaFilter className="mr-2" />
      {selectedDate === 'latest' && 'Latest'}
      {selectedDate === 'all' && 'All Dates'}
      {selectedDate !== 'latest' && selectedDate !== 'all' && formatDisplayDate(selectedDate)}
      <FaChevronDown className="ml-2" />
    </button>

    {showDatePicker && (
      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-10">
        <div className="p-3 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Filter by Date</h3>
            <button
              onClick={() => setShowDatePicker(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="p-2 max-h-64 overflow-y-auto">
          {/* Latest */}
          <button
            onClick={() => handleDateFilter('latest')}
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
              selectedDate === 'latest' ? 'bg-blue-100 text-blue-800' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span>Latest Activities</span>
              <span className="text-xs text-gray-500">Most Recent</span>
            </div>
          </button>

          {/* All */}
          <button
            onClick={() => handleDateFilter('all')}
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
              selectedDate === 'all' ? 'bg-blue-100 text-blue-800' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span>All Dates</span>
              <span className="text-xs text-gray-500">
                {userActivity.data.reduce((total, day) => total + (day.activities?.length || 0), 0)} activities
              </span>
            </div>
          </button>

          <hr className="my-2" />

          {/* Dynamic Dates */}
          {availableDates.map((dateInfo) => (
            <button
              key={dateInfo.date}
              onClick={() => handleDateFilter(dateInfo.date)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                selectedDate === dateInfo.date ? 'bg-blue-100 text-blue-800' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{formatDisplayDate(dateInfo.date)}</span>
                <span className="text-xs text-gray-500">{dateInfo.count} activities</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</div>


      <div className="space-y-8">
        {filteredActivities.map((dayData, dayIndex) => (
          <div key={dayData.date} className="border-l-4 border-blue-200 pl-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                {formatDisplayDate(dayData.date)}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({dayData.activities?.length || 0} {(dayData.activities?.length || 0) === 1 ? 'activity' : 'activities'})
                </span>
              </h3>
            </div>
            
            <div className="space-y-4">
              {dayData.activities?.map((activity, index) => {
                const activityData = Object?.values(activity).find(item => item && item?.activity);
                if (!activityData) return null;

                const timestampKey = Object?.keys(activity).find(key => 
                  typeof key === 'string' && (key.includes('PM') || key.includes('AM'))
                );
                const timestamp = timestampKey ? formatDateString(timestampKey) : '';

                return (
                  <div key={index} className="flex items-start">
                    <div className="relative mr-4">
                      <div className={`flex items-center justify-center h-10 w-10 rounded-full ${getActivityColor(activityData?.activity)}`}>
                        {React.cloneElement(getActivityIcon(activityData?.activity), { className: 'text-lg' })}
                      </div>
                      {index < (dayData.activities?.length || 0) - 1 && (
                        <div className="absolute left-5 top-10 -bottom-6 w-0.5 bg-gray-200"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getActivityColor(activityData?.activity)}`}>
                          {activityData?.activity?.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {timestamp}
                        </span>
                      </div>
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 capitalize">
                          {activityData?.activity?.replace('-', ' ')}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {getActivityDescription(activityData, userName)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No activities found for the selected date filter
        </div>
      )}
    </div>
  );
};

export default ActivityLog;