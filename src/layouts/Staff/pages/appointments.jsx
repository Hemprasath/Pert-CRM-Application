import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
} from "@mui/material";
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  PawPrint,
  Mail,
  User2,
  Phone,
  X,
  Upload,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import { motion } from "framer-motion";

const drawerWidth = 260;

// Dummy Employee/Customer Data
// 🐾 Dummy Services Data
const dummyAppointments = [
  {
    id: 1,
    customerName: "Ameen Pasha",
    email: "ameen@example.com", // ✅ Make sure correct field names
    phone: "+91 9876543210", // ✅ Make sure correct field names
    address: "123 Blue Street",
    state: "Karnataka",
    city: "Bangalore",
    country: "India",
    zip: "560001",
    petName: "Buddy",
    petType: "Dog",
    petBreed: "Labrador",
    petGender: "Male",
    petAge: "3 years",
    doctor: "Dr. John",
    doctorCategory: "Veterinarian",
    date: "2025-10-10",
    time: "10:00 AM",
    duration: "30 mins",
    notes: "Regular health check-up",
    status: "Pending",
  },
  {
    id: 2,
    customerName: "Sara Khan",
    email: "sara@example.com",
    phone: "+91 9876543211",
    address: "45 Green Avenue",
    state: "Maharashtra",
    city: "Mumbai",
    country: "India",
    zip: "400001",
    petName: "Misty",
    petType: "Cat",
    petBreed: "Persian",
    petGender: "Female",
    petAge: "2 years",
    doctor: "Dr. Emily",
    doctorCategory: "Grooming Expert",
    date: "2025-10-12",
    time: "11:30 AM",
    duration: "1 hour",
    notes: "Full grooming session",
    status: "Approved",
  },
];

function Appointments() {
  const email = "admin@demo.com";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedService, setSelectedService] = useState(null);
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    country: "",
    zip: "",
    petName: "",
    petType: "",
    petBreed: "",
    petGender: "",
    petAge: "",
    doctor: "",
    doctorCategory: "",
    date: "",
    time: "",
    duration: "",
    notes: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusUpdate = (newStatus) => {
    setForm((prev) => ({ ...prev, status: newStatus }));
  };

  const handleSubmit = () => {
    if (editing && selected) {
      const updated = appointments.map((a) =>
        a.id === selected.id ? { ...a, ...form } : a
      );
      setAppointments(updated);
    } else {
      const newAppt = {
        id: appointments.length + 1,
        ...form,
      };
      setAppointments([...appointments, newAppt]);
    }
    setOpen(false);
    setEditing(false);
    setSelected(null);
  };

  const handleEdit = (appt) => {
    setEditing(true);
    setSelected(appt);
    setForm(appt);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const handlePhoneChange = (value) => {
    setForm((prev) => ({ ...prev, phone: value }));
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
          Appointments
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

        {/* Search + Add Button */}
        {/* Search + Add Button Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap", // ensures it looks good on small screens too
            gap: 2,
          }}
        >
          {/* Left: Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search by name, email, or pet details..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              minWidth: "300px",
              maxWidth: "45%",
              background: "#fff",
              borderRadius: 2,
              boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Filter size={18} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Right: Status + Add Button */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2.5}
            sx={{
              justifyContent: "flex-end",
              flexShrink: 0,
            }}
          >
            {/* Status Toggle */}
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography variant="body2" fontWeight={600}>
                Status:
              </Typography>

              <ToggleButtonGroup
                value={statusFilter}
                exclusive
                onChange={(e, newValue) => {
                  if (newValue !== null) setStatusFilter(newValue);
                }}
                size="small"
                sx={{
                  backdropFilter: "blur(10px)",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.8), rgba(240,244,248,0.7))",
                  borderRadius: "9999px",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.05)",
                  p: 0.5,
                }}
              >
                {["All", "Pending", "Approved"].map((val) => (
                  <ToggleButton
                    key={val}
                    value={val}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      px: 2.5,
                      borderRadius: "9999px",
                      transition: "all 0.25s ease",
                      color: "#0A1F44",
                      "&.Mui-selected": {
                        background:
                          val === "Pending"
                            ? "linear-gradient(90deg, #facc15, #f59e0b)" // yellow for pending
                            : val === "Approved"
                            ? "linear-gradient(90deg, #4ade80, #22c55e)" // green for approved
                            : "linear-gradient(90deg, #93c5fd, #3b82f6)", // blue for All
                        color: "#fff",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.4)",
                      },
                    }}
                  >
                    {val}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            {/* Add Customer Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                onClick={() => {
                  setEditing(false);
                  setSelectedService(null);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    zip: "",
                    status: "Active",
                    petName: "",
                    petType: "",
                    petBreed: "",
                    petGender: "",
                    petAge: "",
                    petImage: null,
                    petImagePreview: "",
                  });
                  setOpen(true);
                }}
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(84,162,217,1) 0%, rgba(44,94,120,1) 100%)",
                  borderRadius: 3,
                  px: 3,
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  letterSpacing: 0.5,
                  boxShadow:
                    "0 4px 15px rgba(84,162,217,0.4), inset 0 0 6px rgba(255,255,255,0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, rgba(44,94,120,1), rgba(84,162,217,1))",
                    boxShadow: "0 6px 20px rgba(84,162,217,0.5)",
                  },
                }}
              >
                Add Appointment
              </Button>
            </motion.div>
          </Stack>
        </Box>

        {/* Customer Table */}
        {/* Customer Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 4,
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.08), inset 0 0 12px rgba(84,162,217,0.08)",
            background: "linear-gradient(145deg, #ffffff 70%, #f8fafc 30%)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#E0F2FE" }}>
                <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer Details</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Pet Details</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Doctor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date & Time</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id} hover>
                  {/* Customer Name */}
                  {/* Customer Name */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <User2 size={18} color="#0A1F44" />
                      {a.customerName}
                    </Box>
                  </TableCell>

                  {/* Customer Details */}
                  <TableCell
                    sx={{ whiteSpace: "normal", wordWrap: "break-word" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      {a.email && (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Mail size={16} color="#54A2D9" />
                          {a.email}
                        </Box>
                      )}
                      {a.phone && (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Phone size={16} color="#0A1F44" />
                          {a.phone}
                        </Box>
                      )}
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: "0.85rem" }}
                      >
                        {a.address ? `${a.address}, ` : ""}
                        {a.city ? `${a.city}, ` : ""}
                        {a.state ? `${a.state}, ` : ""}
                        {a.country ? `${a.country} - ` : ""}
                        {a.zip ? a.zip : ""}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Pet Details */}
                  <TableCell
                    sx={{
                      maxWidth: 300,
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  >
                    <Chip
                      label={`${a.petName || "-"} • ${a.petType || "-"} • ${
                        a.petBreed || "-"
                      } • ${a.petGender || "-"} • ${a.petAge || "-"} `}
                      size="small"
                      icon={<PawPrint size={14} />}
                      sx={{
                        mr: 0.5,
                        mb: 0.5,
                        backgroundColor: "#E0F2FE",
                        color: "#0A1F44",
                      }}
                    />
                  </TableCell>

                  {/* Doctor */}
                  <TableCell>
                    <Typography variant="body1">{a.doctor}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {a.doctorCategory}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        {a.date}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {a.time}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor:
                            a.status === "Approved"
                              ? "#4CAF50"
                              : a.status === "Cancelled"
                              ? "#F44336"
                              : a.status === "Completed"
                              ? "#2196F3"
                              : "#FFA726",
                        }}
                      />
                      <Typography fontWeight={600}>{a.status}</Typography>
                    </Box>
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <IconButton onClick={() => handleEdit(a)}>
                      <Edit3 size={18} color="#3C8AC6" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(a.id)}>
                      <Trash2 size={18} color="#D32F2F" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Service Modal */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: 4,
              background:
                "linear-gradient(180deg, rgba(84,162,217,0.95), rgba(44, 94, 120, 0.95))",
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 4,
              py: 2.5,
              background: "linear-gradient(90deg, #39517cff, #4da3e1ff)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}
            >
              {editing ? "Edit Appointment" : "Add Appointment"}
            </Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <X size={22} />
            </IconButton>
          </Box>

          {/* Content */}
          <DialogContent
            dividers
            sx={{
              p: 4,
              background: "linear-gradient(135deg, #ffffff 80%, #f0f4f8 20%)",
            }}
          >
            {/* --- Customer Details --- */}
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: "#0A1F44",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Customer Details
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 3,
                background: "#F8FAFC",
                boxShadow: "inset 0 0 10px rgba(84,162,217,0.1)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Customer Name"
                    name="customerName"
                    value={form.customerName || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PhoneInput
                    country={"in"}
                    value={form.phone}
                    onChange={handlePhoneChange}
                    inputStyle={{
                      width: "100%",
                      borderRadius: "8px",
                      fontSize: "15px",
                      height: "56px",
                    }}
                    buttonStyle={{
                      borderRadius: "8px 0 0 8px",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={form.city || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={form.state || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={form.country || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="zip"
                    value={form.zip || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* --- Pet Details --- */}
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: "#0A1F44",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Pet Details
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 3,
                background: "#F8FAFC",
                boxShadow: "inset 0 0 10px rgba(84,162,217,0.1)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pet Name"
                    name="petName"
                    value={form.petName || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Type"
                    name="petType"
                    placeholder="e.g., Dog, Cat"
                    value={form.petType || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Breed"
                    name="petBreed"
                    value={form.petBreed || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    name="petGender"
                    value={form.petGender || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true, // 👈 same behavior
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Gender</em>
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="petAge"
                    placeholder="e.g., 2 years"
                    value={form.petAge || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* --- Doctor Details --- */}
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: "#0A1F44",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Doctor Details
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 3,
                background: "#F8FAFC",
                boxShadow: "inset 0 0 10px rgba(84,162,217,0.1)",
              }}
            >
              <Grid container spacing={2}>
                {/* Doctor Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Doctor"
                    name="doctor"
                    value={form.doctor || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true, // 👈 same behavior
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Doctor</em>
                    </MenuItem>
                    <MenuItem value="Dr. John">Dr. John</MenuItem>
                    <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                    <MenuItem value="Dr. Emily">Dr. Emily</MenuItem>
                  </TextField>
                </Grid>

                {/* Doctor Category */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Doctor Category"
                    name="doctorCategory"
                    value={form.doctorCategory || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true, // 👈 same behavior
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Category</em>
                    </MenuItem>
                    <MenuItem value="Veterinarian">Veterinarian</MenuItem>
                    <MenuItem value="Grooming Expert">Grooming Expert</MenuItem>
                    <MenuItem value="Trainer">Trainer</MenuItem>
                    <MenuItem value="Boarding Manager">
                      Boarding Manager
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    name="date"
                    value={form.date || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Time"
                    name="time"
                    value={form.time || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration"
                    name="duration"
                    placeholder="e.g., 30 mins / 1 hour"
                    value={form.duration || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Notes / Comments"
                    name="notes"
                    value={form.notes || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Admin Controls */}
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: "#0A1F44",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Admin Controls
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "#F8FAFC",
                boxShadow: "inset 0 0 10px rgba(84,162,217,0.1)",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, color: "#0A1F44" }}
                  >
                    Current Status:{" "}
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 700,
                        color:
                          form.status === "Approved"
                            ? "green"
                            : form.status === "Cancelled"
                            ? "red"
                            : form.status === "Completed"
                            ? "blue"
                            : "orange",
                      }}
                    >
                      {form.status || "Pending"}
                    </Box>
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleStatusUpdate("Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleStatusUpdate("Cancelled")}
                    >
                      Reject
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </DialogContent>

          {/* Actions */}
          <DialogActions
            sx={{
              px: 4,
              py: 2.5,
              background: "#f8fafc",
              borderTop: "1px solid #e0e0e0",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                color: "#0A1F44",
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: "linear-gradient(90deg, #0A1F44, #54A2D9)",
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(84,162,217,0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(180deg, rgba(84,162,217,0.95), rgba(44, 94, 120, 0.95))",
                  transform: "scale(1.03)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              Save Appointment
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Appointments;
