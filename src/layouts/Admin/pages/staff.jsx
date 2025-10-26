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
const dummyCustomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    zip: "400001",
    role: "Veterinarian",
    department: "Surgery",
    specialization: "Orthopedic",
    experience: 5,
    shift: "Morning",
    schedule: "https://clinic-schedule.com/sarah",
    joiningDate: "2021-03-10",
    status: "Active",
    profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "+91 9988776655",
    address: "22 Residency Road",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    zip: "560001",
    role: "Trainer",
    department: "Behavioral",
    specialization: "Canine Training",
    experience: 3,
    shift: "Full Day",
    schedule: "",
    joiningDate: "2022-08-01",
    status: "Inactive",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Priya Desai",
    email: "priya@example.com",
    phone: "+91 9876509876",
    address: "10 Garden View",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    zip: "411001",
    role: "Receptionist",
    department: "Front Office",
    specialization: "",
    experience: 2,
    shift: "Evening",
    schedule: "",
    joiningDate: "2023-01-20",
    status: "Active",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

function AdminStaffPage() {
  const email = "admin@demo.com";
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState(dummyCustomers);
  const [statusFilter, setStatusFilter] = useState("All");
  const [editing, setEditing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Form state for Add Customer
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    role: "",
    department: "",
    specialization: "",
    experience: "",
    shift: "",
    schedule: "",
    joiningDate: "",
    status: "Active",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setForm((prev) => ({ ...prev, phone: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        petImage: file,
        petImagePreview: URL.createObjectURL(file),
      });
    }
  };

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase()) ||
      (c.role && c.role.toLowerCase().includes(search.toLowerCase())) ||
      (c.department &&
        c.department.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && c.status === "Active") ||
      (statusFilter === "Inactive" && c.status === "Inactive");

    return matchesSearch && matchesStatus;
  });

  const handleSubmit = () => {
    if (editing && selectedCustomer) {
      // ✏️ Update existing staff
      const updated = customers.map((cust) =>
        cust.id === selectedCustomer.id
          ? {
              ...cust,
              name: form.name,
              email: form.email,
              phone: form.phone,
              address: form.address,
              city: form.city,
              state: form.state,
              zip: form.zip,
              role: form.role,
              department: form.department,
              specialization: form.specialization,
              experience: form.experience,
              shift: form.shift,
              schedule: form.schedule,
              joiningDate: form.joiningDate,
              status: form.status,
              profileImage: form.profileImage,
            }
          : cust
      );
      setCustomers(updated);
    } else {
      // ➕ Add new staff
      const newStaff = {
        id: customers.length + 1,
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        role: form.role,
        department: form.department,
        specialization: form.specialization,
        experience: form.experience,
        shift: form.shift,
        schedule: form.schedule,
        joiningDate: form.joiningDate,
        status: form.status || "Active",
        profileImage: form.profileImage,
      };
      setCustomers([...customers, newStaff]);
    }

    setOpen(false);
    setEditing(false);
    setSelectedCustomer(null);
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
          Staff Management
          <Box
            sx={{
              position: "absolute",
              bottom: -6,
              left: 60,
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
                {["All", "Active", "Inactive"].map((val) => (
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
                          val === "Active"
                            ? "linear-gradient(90deg, #4ade80, #22c55e)"
                            : val === "Inactive"
                            ? "linear-gradient(90deg, #f87171, #dc2626)"
                            : "linear-gradient(90deg, #93c5fd, #3b82f6)",
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
                  setSelectedCustomer(null);
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
                Add Staff
              </Button>
            </motion.div>
          </Stack>
        </Box>

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
                <TableCell sx={{ fontWeight: 700 }}>Profile</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Details</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Role / Department
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Work Info</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((c) => (
                <TableRow
                  key={c.id}
                  hover
                  sx={{ "&:hover": { background: "rgba(84,162,217,0.08)" } }}
                >
                  {/* Profile Image */}
                  <TableCell>
                    <Avatar
                      src={c.profileImage}
                      alt={c.name}
                      sx={{
                        width: 45,
                        height: 45,
                        border: "2px solid #54A2D9",
                      }}
                    />
                  </TableCell>

                  {/* Name */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <User2 size={18} color="#0A1F44" />
                      {c.name}
                    </Box>
                  </TableCell>

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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Mail size={16} color="#54A2D9" />
                        {c.email}
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Phone size={16} color="#0A1F44" />
                        {c.phone}
                      </Box>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: "0.85rem" }}
                      >
                        {c.address}, {c.city}, {c.state}, {c.country} - {c.zip}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Role / Department */}
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {c.role}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {c.department}
                    </Typography>
                  </TableCell>

                  {/* Work Info */}
                  <TableCell>
                    <Typography variant="body2">
                      <strong>Shift:</strong> {c.shift}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Joined:</strong> {c.joiningDate}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ width: 120 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor:
                            c.status === "Active" ? "#4CAF50" : "#F44336",
                          boxShadow: `0 0 6px ${
                            c.status === "Active"
                              ? "rgba(76,175,80,0.6)"
                              : "rgba(244,67,54,0.6)"
                          }`,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: c.status === "Active" ? "#2E7D32" : "#C62828",
                          fontWeight: 600,
                        }}
                      >
                        {c.status}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center" sx={{ width: 100 }}>
                    <IconButton
                      onClick={() => {
                        setEditing(true);
                        setSelectedCustomer(c);
                        const pet = c.pets?.[0] || {};
                        setForm({
                          name: c.name || "",
                          email: c.email || "",
                          phone: c.phone || "",
                          address: c.address || "",
                          city: c.city || "",
                          state: c.state || "",
                          zip: c.zip || "",
                          role: c.role || "",
                          department: c.department || "",
                          specialization: c.specialization || "",
                          experience: c.experience || "",
                          shift: c.shift || "",
                          schedule: c.schedule || "",
                          joiningDate: c.joiningDate || "",
                          status: c.status || "Active",
                          profileImage: c.profileImage || null,
                          petName: pet.name || "",
                          petType: pet.type || "",
                          petBreed: pet.breed || "",
                          petGender: pet.gender || "",
                          petAge: pet.age || "",
                        });
                        setOpen(true);
                      }}
                    >
                      <Edit3 size={18} color="#3C8AC6" />
                    </IconButton>
                    <IconButton>
                      <Trash2 size={18} color="#D32F2F" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Modal */}
        {/* Add/Edit Staff Modal */}
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
              {editing ? "Edit Staff" : "Add Staff"}
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
            {/* Basic Details */}
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
              Basic Details
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
                    label="Full Name"
                    name="name"
                    value={form.name}
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={form.state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Divider sx={{ my: 3 }} />

            {/* Professional Info */}
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
              Professional Info
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
                    select
                    fullWidth
                    label="Role"
                    name="role"
                    value={form.role || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true, // 👈 same behavior
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Role</em>
                    </MenuItem>
                    <MenuItem value="Veterinarian">Veterinarian</MenuItem>
                    <MenuItem value="Groomer">Groomer</MenuItem>
                    <MenuItem value="Trainer">Trainer</MenuItem>
                    <MenuItem value="Receptionist">Receptionist</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Specialization"
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Experience (Years)"
                    name="experience"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={form.experience}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Divider sx={{ my: 3 }} />

            {/* Work Info */}
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
              Work Info
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    label="Shift"
                    name="shift"
                    value={form.shift || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true, // 👈 same behavior
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Shift</em>
                    </MenuItem>
                    <MenuItem value="Morning">Morning</MenuItem>
                    <MenuItem value="Evening">Evening</MenuItem>
                    <MenuItem value="Full Day">Full Day</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Schedule / Notes"
                    name="schedule"
                    value={form.schedule}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Joining Date"
                    type="date"
                    name="joiningDate"
                    value={form.joiningDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={form.status || "Active"}
                    onChange={handleChange}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>

                {/* Profile Image Upload */}
                <Grid item xs={12} sm={8}>
                  <Box
                    sx={{
                      border: "2px dashed #54A2D9",
                      borderRadius: 3,
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "rgba(84,162,217,0.05)" },
                    }}
                    onClick={() =>
                      document.getElementById("staffImageInput").click()
                    }
                  >
                    {form.profileImagePreview ? (
                      <img
                        src={form.profileImagePreview}
                        alt="Staff"
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    ) : (
                      <>
                        <Upload size={30} color="#54A2D9" />
                        <Typography sx={{ mt: 1, color: "#0A1F44" }}>
                          Click to upload staff photo
                        </Typography>
                      </>
                    )}
                    <input
                      id="staffImageInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </Box>
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
                  backdropFilter: "blur(14px)",
                  transform: "scale(1.03)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              Save Staff
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default AdminStaffPage;
