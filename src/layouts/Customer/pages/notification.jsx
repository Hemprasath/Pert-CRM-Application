import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import {
  Stethoscope,
  Scissors,
  Heart,
  Calendar,
  Clock,
  RotateCcw,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const drawerWidth = 260;

// Export at the beginning
export function CustomerNotifications() {
  const email = "customer@demo.com";

  const dummyNotifications = [
    {
      id: "1",
      petName: "Charlie",
      service: "Vaccination",
      type: "health",
      doctor: "Dr. Smith",
      date: "2025-10-12",
      time: "10:00",
      status: "Pending",
    },
    {
      id: "2",
      petName: "Misty",
      service: "Dental Cleaning",
      type: "health",
      doctor: "Dr. Brown",
      date: "2025-10-13",
      time: "14:30",
      status: "Completed",
    },
    {
      id: "3",
      petName: "Buddy",
      service: "Grooming",
      type: "grooming",
      date: "2025-10-14",
      time: "09:00",
      status: "Pending",
    },
    {
      id: "4",
      petName: "Bella",
      service: "Subscription Renewal",
      type: "subscription",
      date: "2025-10-14",
      time: "11:30",
      status: "Pending",
    },
  ];

  const [notifications, setNotifications] = useState(dummyNotifications);
  const [timeLefts, setTimeLefts] = useState({});
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimes = {};
      notifications.forEach((n) => {
        const targetDate = new Date(`${n.date}T${n.time}`);
        const diff = targetDate - new Date();
        if (diff <= 0) {
          updatedTimes[n.id] = "Now";
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          updatedTimes[n.id] = `${hours}h ${minutes}m ${seconds}s`;
        }
      });
      setTimeLefts(updatedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [notifications]);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Filter notifications based on date and status
  const filteredNotifications = notifications.filter((n) => {
    const notificationDate = new Date(n.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const dateMatch =
      (!from || notificationDate >= from) && (!to || notificationDate <= to);
    const statusMatch = statusFilter ? n.status === statusFilter : true;

    return dateMatch && statusMatch;
  });

  // Icon selector
  const getIcon = (type) => {
    switch (type) {
      case "health":
        return <Stethoscope color="#1976d2" size={20} />;
      case "grooming":
        return <Scissors color="#ff9800" size={20} />;
      case "subscription":
        return <Heart color="#e91e63" size={20} />;
      default:
        return <Calendar color="#1976d2" size={20} />;
    }
  };

  // Card color based on type and status (ultra-light pastel theme)
  const getCardColor = (type, status) => {
    if (status === "Completed") {
      return "linear-gradient(135deg, #f0fff4, #d9f7e0)"; // very soft green
    }
    switch (type) {
      case "health":
        return "linear-gradient(135deg, #f0f8ff, #e0f0ff)"; // very soft blue
      case "grooming":
        return "linear-gradient(135deg, #fffaf5, #fff0e0)"; // very soft peach
      case "subscription":
        return "linear-gradient(135deg, #fff0f5, #ffe6f0)"; // very soft pink
      default:
        return "linear-gradient(135deg, #fafbfc, #e9eef5)"; // very soft gray/white
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar email={email} />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "#f1f5f9",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Toolbar />

        {/* Page Title */}
        <Typography
          variant="h4"
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            fontWeight: 800,
            letterSpacing: 0.5,
            mb: 5,
            background: "linear-gradient(90deg, #0A1F44, #54A2D9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
          }}
        >
          Pet Notifications
          <Box
            sx={{
              position: "absolute",
              bottom: -6,
              left: 40,
              width: "70%",
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, #54A2D9, #8B7EAE)",
              animation: "underlinePulse 3s infinite ease-in-out",
              "@keyframes underlinePulse": {
                "0%, 100%": { opacity: 0.5, transform: "scaleX(1)" },
                "50%": { opacity: 1, transform: "scaleX(1.1)" },
              },
            }}
          />
        </Typography>

        <Box>
          {/* Filters */}
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              alignItems: "center",
              mb: 5,
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
              },
            }}
          >
            <TextField
              label="From Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              sx={{
                flex: 1,
                minWidth: 150,
                borderRadius: 2,
                "& .MuiInputBase-root": {
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: "12px",
                },
              }}
            />

            <TextField
              label="To Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              sx={{
                flex: 1,
                minWidth: 150,
                "& .MuiInputBase-root": {
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: "12px",
                },
              }}
            />

            <FormControl
              sx={{
                flex: 1,
                minWidth: 150,
                "& .MuiInputBase-root": {
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: "12px",
                },
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>

            <IconButton
              sx={{
                p: 1.5,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ff6ec4, #7873f5)",
                color: "#fff",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                  background: "linear-gradient(135deg, #ff85d0, #8a7fff)",
                },
              }}
              onClick={() => {
                setFromDate("");
                setToDate("");
                setStatusFilter("");
              }}
            >
              <RotateCcw size={22} />
            </IconButton>
          </Box>
          {/* Notifications Grid */}
          <Grid container spacing={4}>
            {filteredNotifications.length === 0 ? (
              <Typography color="text.secondary" sx={{ ml: 2 }}>
                No notifications found.
              </Typography>
            ) : (
              filteredNotifications.map((notification) => (
                <Grid item xs={12} sm={6} md={4} key={notification.id}>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: "20px",
                      background: getCardColor(
                        notification.type,
                        notification.status
                      ),
                      boxShadow:
                        "4px 4px 15px rgba(0,0,0,0.05), -4px -4px 15px rgba(255,255,255,0.7)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow:
                          "6px 6px 25px rgba(0,0,0,0.08), -6px -6px 25px rgba(255,255,255,0.6)",
                      },
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Header: Icon, Pet Name, Status */}
                    <Box display="flex" alignItems="center" mb={2} gap={1.5}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          backgroundColor: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {getIcon(notification.type)}
                      </Box>

                      <Typography variant="h6" fontWeight={700} sx={{ ml: 1 }}>
                        {notification.petName}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          ml: "auto",
                          px: 2,
                          py: 0.5,
                          borderRadius: "12px",
                          backgroundColor:
                            notification.status === "Completed"
                              ? "rgba(76, 175, 80, 0.15)"
                              : "rgba(255, 152, 0, 0.15)",
                          color:
                            notification.status === "Completed"
                              ? "#4caf50"
                              : "#ff9800",
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      >
                        {notification.status}
                      </Typography>
                    </Box>

                    {/* Body: Service, Doctor, Date & Time */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                      >
                        <strong>Service:</strong> {notification.service}
                      </Typography>

                      {notification.doctor && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={0.5}
                        >
                          <strong>Doctor:</strong> {notification.doctor}
                        </Typography>
                      )}

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                      >
                        <strong>Date:</strong> {notification.date}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        <strong>Time:</strong> {notification.time}
                      </Typography>
                    </Box>

                    {/* Footer: Countdown
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                        gap: 1,
                      }}
                    >
                      <Clock size={16} color="#d32f2f" />
                      <Typography variant="caption" color="#d32f2f">
                        Starts in: 2h 30m
                      </Typography>
                    </Box> */}
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default CustomerNotifications;
