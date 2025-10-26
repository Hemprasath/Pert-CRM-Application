import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Card,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  User,
  Mail,
  Phone,
  Stethoscope,
  Calendar,
  Clock,
  Repeat,
  MapPin,
  Tag,
  Award,
} from "lucide-react";

const drawerWidth = 260;

// Helper for date formatting
function formatDate(d) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getDatesBetween(start, end) {
  const dates = [];
  const cur = new Date(start);
  while (cur <= end) {
    dates.push(formatDate(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

function StaffDashboardPage() {
  const email = "staff@demo.com";
  const [selectedFilter, setSelectedFilter] = useState("week");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [appliedRange, setAppliedRange] = useState({ type: "week" });
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);

  useEffect(() => {
    // Dummy data
    setAllAppointments([
      {
        id: 1,
        customer: {
          name: "John Doe",
          contact: "9898757123",
          email: "john@example.com",
          city: "Mumbai",
          state: "Maharashtra",
          zip: "400001",
          country: "India",
        },
        pet: { name: "Buddy", type: "Dog", breed: "Labrador", age: 4 },
        doctor: { name: "Dr. Smith", category: "Veterinarian" },
        date: "2025-10-09",
        time: "10:00 AM - 10:30 AM",
        status: "Pending",
      },
      {
        id: 2,
        customer: {
          name: "Priya Sharma",
          contact: "9885554910",
          email: "priya@example.com",
          city: "Delhi",
          state: "Delhi",
          zip: "110001",
          country: "India",
        },
        pet: { name: "Milo", type: "Cat", breed: "Siamese", age: 2 },
        doctor: { name: "Dr. Johnson", category: "Veterinarian" },
        date: "2025-10-09",
        time: "11:00 AM - 11:30 AM",
        status: "Approved",
      },
    ]);
  }, []);

  // Filter chart data
  useEffect(() => {
    if (!allAppointments.length) return;
    const today = new Date();
    let startDate, endDate;
    if (appliedRange.type === "week") {
      endDate = today;
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 6);
    } else if (appliedRange.type === "month") {
      endDate = today;
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 29);
    } else if (appliedRange.type === "custom") {
      startDate = new Date(appliedRange.start);
      endDate = new Date(appliedRange.end);
    } else {
      startDate = new Date("2025-01-01");
      endDate = today;
    }

    const dates = getDatesBetween(startDate, endDate);
    const counts = {};
    dates.forEach((d) => (counts[d] = 0));
    allAppointments.forEach((ev) => {
      const key = ev.date;
      if (counts[key] !== undefined) counts[key]++;
    });
    setFilteredChartData(
      dates.map((d) => ({ date: d, appointments: counts[d] || 0 }))
    );
  }, [appliedRange, allAppointments]);

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setSelectedFilter(val);
    if (val !== "custom") setAppliedRange({ type: val });
  };

  const handleApplyCustom = () => {
    if (!customStart || !customEnd) return alert("Select both dates!");
    setAppliedRange({ type: "custom", start: customStart, end: customEnd });
  };

  const handleFollowUp = (task) =>
    alert(`Follow-up reminder sent to ${task.customer.name} ✅`);

  const renderCard = (task) => (
    <Card
      key={task.id}
      sx={{
        mb: 3,
        borderRadius: 3,
        p: 3,
        bgcolor: "#ffffff",
        boxShadow: "0 8px 25px rgba(10,31,68,0.08)",
        border: "1px solid rgba(84,162,217,0.3)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 50px rgba(10,31,68,0.15)",
        },
      }}
    >
      {/* Status & Follow Up */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 0.5,
            borderRadius: "50px",
            fontWeight: 700,
            fontSize: 13,
            color: "#fff",
            textAlign: "center",
            display: "inline-block",
            background:
              task.status === "Approved"
                ? "linear-gradient(135deg, #2e7d32, #81c784)"
                : "linear-gradient(135deg, #d32f2f, #ef5350)",
          }}
        >
          {task.status}
        </Box>
        <Button
          size="small"
          variant="contained"
          startIcon={<Repeat size={16} />}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: 13,
            borderRadius: "50px",
            px: 3,
            py: 0.8,
            color: "#fff",
            background: "linear-gradient(135deg, #0A1F44, #54A2D9)",
            "&:hover": {
              background: "linear-gradient(135deg, #05406e, #1976d2)",
            },
          }}
          onClick={() => handleFollowUp(task)}
        >
          Follow Up
        </Button>
      </Box>

      {/* Customer Info */}
      <Box
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 3,
          bgcolor: "rgba(84,162,217,0.05)",
          borderLeft: "4px solid #54A2D9",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            color: "transparent",
            background: "linear-gradient(90deg, #54A2D9, #8B7EAE)",
            WebkitBackgroundClip: "text",
            mb: 2,
          }}
        >
          Customer Information
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <User size={18} style={{ marginRight: 8, color: "#54A2D9" }} />
          <Typography sx={{ fontWeight: 600, color: "#0A1F44" }}>
            {task.customer.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Phone size={16} style={{ marginRight: 6, color: "#54A2D9" }} />
          <Typography variant="body2" sx={{ color: "#0A1F44" }}>
            {task.customer.contact}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Mail size={16} style={{ marginRight: 6, color: "#54A2D9" }} />
          <Typography variant="body2" sx={{ color: "#0A1F44" }}>
            {task.customer.email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MapPin size={16} style={{ marginRight: 6, color: "#54A2D9" }} />
          <Typography variant="body2" sx={{ color: "#0A1F44" }}>
            {task.customer.city}, {task.customer.state}, {task.customer.zip},{" "}
            {task.customer.country}
          </Typography>
        </Box>
      </Box>

      {/* Pet Info */}
      <Box
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 3,
          bgcolor: "rgba(84,162,217,0.1)",
          borderRight: "4px solid #54A2D9",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            color: "transparent",
            background: "linear-gradient(90deg, #54A2D9, #8B7EAE)",
            WebkitBackgroundClip: "text",
            mb: 2,
          }}
        >
          Pet Information
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <User size={16} style={{ marginRight: 6 }} />
          <Typography sx={{ color: "#0A1F44" }}>
            Name: {task.pet.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Tag size={16} style={{ marginRight: 6 }} />
          <Typography sx={{ color: "#0A1F44" }}>
            Type: {task.pet.type}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Award size={16} style={{ marginRight: 6 }} />
          <Typography sx={{ color: "#0A1F44" }}>
            Breed: {task.pet.breed}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Clock size={16} style={{ marginRight: 6 }} />
          <Typography sx={{ color: "#0A1F44" }}>
            Age: {task.pet.age} yrs
          </Typography>
        </Box>
      </Box>

      {/* Doctor & Schedule */}
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: "rgba(84,162,217,0.05)",
          borderLeft: "4px solid #54A2D9",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            color: "transparent",
            background: "linear-gradient(90deg, #54A2D9, #8B7EAE)",
            WebkitBackgroundClip: "text",
            mb: 2,
          }}
        >
          {" "}
          Appointment Details
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Stethoscope size={16} style={{ color: "#54A2D9" }} />
          <Typography sx={{ fontWeight: 500, color: "#0A1F44" }}>
            {task.doctor.name} ({task.doctor.category})
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Calendar size={16} style={{ color: "#54A2D9" }} />
          <Typography sx={{ fontWeight: 500, color: "#0A1F44" }}>
            {task.date}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Clock size={16} style={{ color: "#54A2D9" }} />
          <Typography sx={{ fontWeight: 500, color: "#0A1F44" }}>
            {task.time}
          </Typography>
        </Box>
      </Box>
    </Card>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
        }}
      >
        <Toolbar />
        {/* Dashboard Heading */}{" "}
        <Typography
          variant="h4"
          gutterBottom
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
            fontSize: "1.8rem",
            textTransform: "uppercase",
          }}
        >
          {" "}
          Dashboard Overview{" "}
          <LineChart
            size={22}
            style={{ marginLeft: 8, color: "#54A2D9", verticalAlign: "middle" }}
          />{" "}
          {/* Decorative Gradient Underline */}{" "}
          <Box
            sx={{
              position: "absolute",
              bottom: -6,
              right: 55,
              width: "80%",
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, #54A2D9, #8B7EAE)",
              boxShadow: "0 2px 8px rgba(84,162,217,0.5)",
              animation: "underlineGlow 3s ease-in-out infinite",
              "@keyframes underlineGlow": {
                "0%, 100%": { opacity: 0.6, transform: "scaleX(1)" },
                "50%": { opacity: 1, transform: "scaleX(1.05)" },
              },
            }}
          />{" "}
        </Typography>
        {/* Chart Card */}
        <Card sx={{ mb: 4, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #4dabf7, #2196f3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                textShadow: "0 2px 6px rgba(33, 150, 243, 0.3)",
              }}
            >
              {" "}
              Appointment Insights{" "}
            </Typography>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel
                id="filter-label"
                sx={{
                  color: "#1976d2",
                  "&.Mui-focused": { color: "#115293" }, // label color when focused
                }}
              >
                Filter By
              </InputLabel>
              <Select
                labelId="filter-label"
                value={selectedFilter}
                onChange={handleFilterChange}
                label="Filter By" // Important: lets the label shrink properly
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#115293",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#115293",
                  },
                }}
              >
                <MenuItem value="week">Last 7 Days</MenuItem>
                <MenuItem value="month">Last 30 Days</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {selectedFilter === "custom" && (
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                type="date"
                size="small"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
              />
              <TextField
                type="date"
                size="small"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
              />
              <Button
                size="small"
                variant="contained"
                onClick={handleApplyCustom}
              >
                Apply
              </Button>
            </Box>
          )}
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={filteredChartData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="appointments"
                stroke="#4dabf7"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        {/* Appointments */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(90deg, #4dabf7, #2196f3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            textShadow: "0 2px 6px rgba(33, 150, 243, 0.3)",
            mb: 3, // adds spacing below
            letterSpacing: 0.5, // subtle spacing between letters
          }}
        >
          Today's Appointments
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 3,
          }}
        >
          {allAppointments.map(renderCard)}
        </Box>
      </Box>
    </Box>
  );
}

export default StaffDashboardPage;
