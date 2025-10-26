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
  Switch,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
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

// Dummy Customer Data
const dummyCustomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+91 9876543210",
    status: "Active",
    address: "123 Blue Street",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    zip: "400001",
    pets: [
      {
        name: "Bella",
        type: "Dog",
        breed: "Golden Retriever",
        gender: "Female",
        age: "5",
      },
      { name: "Milo", type: "Cat", breed: "Persian", gender: "Male", age: "4" },
    ],
    alerts: {
      email: true,
      whatsapp: false,
      sms: true,
      aiFeatures: false,
    },
  },
  {
    id: 2,
    name: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "+91 9988776655",
    status: "Inactive",
    address: "45 Green Avenue",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    zip: "110001",
    pets: [
      {
        name: "Rocky",
        type: "Dog",
        breed: "Labrador",
        gender: "Male",
        age: "6",
      },
    ],
    alerts: {
      email: false,
      whatsapp: true,
      sms: false,
      aiFeatures: true,
    },
  },
  {
    id: 3,
    name: "Priya Desai",
    email: "priya@example.com",
    phone: "+91 9876509876",
    status: "Active",
    address: "78 Sunset Blvd",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    zip: "560001",
    pets: [
      {
        name: "Luna",
        type: "Rabbit",
        breed: "Mini Lop",
        gender: "Female",
        age: "4",
      },
    ],
    alerts: {
      email: true,
      whatsapp: true,
      sms: false,
      aiFeatures: true,
    },
  },
];

function AdminCustomersPage() {
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
    country: "India", // default country
    zip: "",
    petName: "",
    petType: "",
    petBreed: "",
    petGender: "",
    petAge: "",
    petImage: null,
    petImagePreview: "",
  });

  const [alertSettings, setAlertSettings] = useState({
    email: true,
    whatsapp: false,
    sms: true,
    aiFeatures: "Enabled",
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
      c.pets.some(
        (p) =>
          p.type.toLowerCase().includes(search.toLowerCase()) ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.breed.toLowerCase().includes(search.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && c.status === "Active") ||
      (statusFilter === "Inactive" && c.status === "Inactive");

    return matchesSearch && matchesStatus;
  });

  const handleSubmit = () => {
    if (editing && selectedCustomer) {
      // ✏️ Update existing
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
              country: form.country,
              zip: form.zip,
              status: form.status,
              pets: [
                {
                  name: form.petName,
                  type: form.petType,
                  breed: form.petBreed,
                  gender: form.petGender,
                  age: form.petAge,
                },
              ],
              alerts: alertSettings, // 🔥 Add this line
            }
          : cust
      );
      setCustomers(updated);
    } else {
      // ➕ Add new
      const newCustomer = {
        id: customers.length + 1,
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        country: form.country, // ✅ add this
        zip: form.zip,
        status: form.status || "Active",
        pets: [
          {
            name: form.petName,
            type: form.petType,
            breed: form.petBreed,
            gender: form.petGender,
            age: form.petAge,
          },
        ],
        alerts: alertSettings,
      };
      setCustomers([...customers, newCustomer]);
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
          Customer Management
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
                Add Customer
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
                <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer Details</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Pet Details</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Alerts</TableCell>
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
                  {/* Customer Name */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <User2 size={18} color="#0A1F44" />
                      {c.name}
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

                  {/* Pet Details */}
                  <TableCell
                    sx={{
                      maxWidth: 300,
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  >
                    {c.pets.map((p, i) => (
                      <Chip
                        key={i}
                        label={`${p.name} • ${p.type} • ${p.breed} • ${p.gender} • ${p.age} yrs`}
                        size="small"
                        icon={<PawPrint size={14} />}
                        sx={{
                          mr: 0.5,
                          mb: 0.5,
                          backgroundColor: "#E0F2FE",
                          color: "#0A1F44",
                        }}
                      />
                    ))}
                  </TableCell>

                  <TableCell sx={{ minWidth: 120, verticalAlign: "top" }}>
                    <Stack spacing={0.5} alignItems="flex-start">
                      {["email", "whatsapp", "sms", "aiFeatures"].map(
                        (alert) => {
                          const isActive = c.alerts?.[alert];
                          const label = alert
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase());

                          return (
                            <Box
                              key={alert}
                              sx={{
                                px: 1.5,
                                py: 0.3,
                                borderRadius: 1.5,
                                fontSize: "0.65rem",
                                fontWeight: 600,
                                textAlign: "center",
                                background: isActive
                                  ? "linear-gradient(90deg, #FFD700, #FFC107)"
                                  : "#E0E0E0",
                                color: isActive ? "#0A1F44" : "#757575",
                                transition: "all 0.2s ease",
                                cursor: "default",
                                width: "fit-content",
                              }}
                            >
                              {label}
                            </Box>
                          );
                        }
                      )}
                    </Stack>
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ width: 120, pr: 2 }}>
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
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: c.status === "Active" ? "#2E7D32" : "#C62828",
                          fontWeight: 600,
                          fontSize: "0.9rem",
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
                          status: c.status || "Active",
                          petName: pet.name || "",
                          petType: pet.type || "",
                          petBreed: pet.breed || "",
                          petGender: pet.gender || "",
                          petAge: pet.age || "",
                          petImage: null,
                          petImagePreview: "",
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
              {editing ? "Edit Customer" : "Add Customer"}
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
            {/* Customer Section */}
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={form.status || "Active"} // default Active
                    onChange={handleChange}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Paper>

            <Divider sx={{ my: 3 }} />

            {/* Pet Section */}
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
                    value={form.petName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Pet Type"
                    name="petType"
                    value={form.petType || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true, // 👈 shows placeholder even when value=""
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Pet Type</em>
                    </MenuItem>
                    <MenuItem value="Dog">Dog</MenuItem>
                    <MenuItem value="Cat">Cat</MenuItem>
                    <MenuItem value="Rabbit">Rabbit</MenuItem>
                    <MenuItem value="Bird">Bird</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Breed"
                    name="petBreed"
                    value={form.petBreed}
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
                    type="number"
                    value={form.petAge}
                    onChange={handleChange}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      border: "2px dashed #54A2D9",
                      borderRadius: 3,
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(84,162,217,0.05)",
                      },
                    }}
                    onClick={() =>
                      document.getElementById("petImageInput").click()
                    }
                  >
                    {form.petImagePreview ? (
                      <img
                        src={form.petImagePreview}
                        alt="Pet"
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
                          Click to upload pet image
                        </Typography>
                      </>
                    )}
                    <input
                      id="petImageInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Divider sx={{ my: 3 }} />

            {/* Alert Settings Section */}
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
              Alert Settings
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "#F8FAFC",
                boxShadow: "inset 0 0 10px rgba(84,162,217,0.1)",
                width: 300, // compact width
                ml: 2, // margin from the left edge
                mt: 2, // optional margin from top
              }}
            >
              <Stack spacing={2}>
                {/* Email Switch */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Email Notifications</Typography>
                  <Switch
                    checked={alertSettings.email}
                    onChange={(e) =>
                      setAlertSettings((prev) => ({
                        ...prev,
                        email: e.target.checked,
                      }))
                    }
                    color="primary"
                  />
                </Box>

                {/* WhatsApp Switch */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>WhatsApp Notifications</Typography>
                  <Switch
                    checked={alertSettings.whatsapp}
                    onChange={(e) =>
                      setAlertSettings((prev) => ({
                        ...prev,
                        whatsapp: e.target.checked,
                      }))
                    }
                    color="success"
                  />
                </Box>

                {/* SMS Switch */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>SMS Notifications</Typography>
                  <Switch
                    checked={alertSettings.sms}
                    onChange={(e) =>
                      setAlertSettings((prev) => ({
                        ...prev,
                        sms: e.target.checked,
                      }))
                    }
                    color="secondary"
                  />
                </Box>

                {/* AI Features Switch */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>AI Features</Typography>
                  <Switch
                    checked={alertSettings.aiFeatures}
                    onChange={(e) =>
                      setAlertSettings((prev) => ({
                        ...prev,
                        aiFeatures: e.target.checked,
                      }))
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#FFD700",
                        "&:hover": {
                          backgroundColor: "rgba(255,215,0,0.08)",
                        },
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#FFD700",
                        },
                      "& .MuiSwitch-track": {
                        backgroundColor: "#bfbfbf",
                      },
                    }}
                  />
                </Box>
              </Stack>
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
              Save Customer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default AdminCustomersPage;
