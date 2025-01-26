import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpService from "../../common/httpService";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import { useAuth } from "../../common/AuthContext";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const Notifications = () => {
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const getAuthToken = () => localStorage.getItem("token");

  // Fetch all notifications
  const getAllNotifications = async () => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/not`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      const data = response?.data?.filter((item) => {
        return !item?.is_read;
      });
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  // Mark notification as read
  const readNotification = async (notiId) => {
    try {
      const response = await httpService({
        method: "POST",
        url: `${BaseUrl}/notifications/${notiId}/read`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        data: { user_id: userId },
      });
      getAllNotifications(); // Refresh notifications after marking as read
    } catch (error) {
      console.error("Error reading notification", error);
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, [userId]);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    readNotification(notification.id); // Mark notification as read

    // Navigate based on the notification message
    const message = notification?.message?.toLowerCase(); // Convert message to lowercase for accurate comparison

    if (message.includes("new attendance registration") || message.includes("new speaker registration") || message.includes("new group registration:")) {
      navigate(`/pending/users`);
    } else if (message.includes("new attendance registration")) {
      navigate(`/edit/attendance/data/${notification?.conference_id}/${notification?.register_id}`);
    } else if (message.includes("new visa request from user")) {
      navigate(`/admin/visa2/${notification?.register_id}`);
    } else if (message.includes("now you can access the activated file and download the registered names")) {
      navigate(`/add/excel`);
    } else if (message.includes("check available flights on the website and select your option to proceed")) {
      navigate(`/flight/form`);
    } else if (message.includes("we are pleased to inform you that your profile is now active")) {
      navigate(`/speaker/profile`);
    } else if (message.includes("a new abstract has been added")) {
      navigate(`/abs/${notification?.register_id}/${notification?.conference_id}`);
    } else if (message.includes("new sponsor registration")) {
      navigate(`/pending/users`);
    } else if (message.includes("new flight registered by")) {
      navigate(`/flights`);
    } else if (message.includes("your visa document has been successfully uploaded")) {
      navigate(`/visa`);
    } else if (message.includes("your certificate has been successfully uploaded")) {
      navigate(`/certification`);
    } else if (message.includes("has requested additional trips")) {
      navigate(`/enter/new/flights`);
    } else if (message.includes("has signed a contract")) {
      navigate(`/all-sponsors`);
    } else if (message.includes("has requested to become an admin")) {
      navigate(`/pending/users`);
    }
  };

  const unreadNotifications = notifications.filter(
    (notification) => notification.is_read === 0
  );

  return (
    <div className="notification-container" style={{marginLeft:16 , marginTop:'8vh'}}>
      {selectedNotification ? (
        // If there is a selected notification, show its details
        <div className="notification-detail">
          <h2>Notification Details</h2>
          <div className="notification-content">
            <p>{selectedNotification.message}</p>
            {/* Add more details here based on the notification */}
            <button onClick={() => setSelectedNotification(null)}>Back to Notifications</button>
          </div>
        </div>
      ) : (
        // Show list of notifications
        <div className="notification-list">
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map((notification) => (
              <div
                key={notification.id}
                className="notification-item unread"
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-content">
                  <div className="notification-title">{notification.message}</div>
                </div>
              </div>
            ))
          ) : (
            <p>No new notifications yet</p>
          )}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick />
    </div>
  );
};

export default Notifications;
