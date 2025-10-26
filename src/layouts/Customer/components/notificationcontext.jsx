import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Appointment Reminder",
      message: "Luna has an appointment with Dr. Meena at 5:00 PM today.",
      type: "appointment",
      date: "Oct 8, 2025 — 09:00 AM",
      read: false,
    },
    {
      id: 2,
      title: "Vaccination Alert",
      message: "Rabies vaccine due on 15 Jan 2026 for Luna.",
      type: "vaccine",
      date: "Oct 7, 2025 — 07:30 AM",
      read: true,
    },
    {
      id: 3,
      title: "Clinic Offer",
      message: "Get 20% off on grooming services this weekend!",
      type: "offer",
      date: "Oct 6, 2025 — 01:00 PM",
      read: false,
    },
    {
      id: 4,
      title: "Health Tip",
      message: "Remember to brush Luna’s teeth regularly to prevent plaque build-up.",
      type: "tip",
      date: "Oct 5, 2025 — 06:00 PM",
      read: true,
    },
  ]);

  // Mark one as read
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Delete notification
  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleDeleteAll = () => {
  setNotifications([]); // Clears the entire notifications array
};
  return (
    <NotificationContext.Provider
      value={{ notifications, handleMarkAsRead, handleMarkAllAsRead, handleDelete, handleDeleteAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
