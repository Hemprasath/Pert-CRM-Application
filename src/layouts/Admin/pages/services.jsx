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
const dummyServices = [
  {
    id: 1,
    name: "Veterinary Health Checkup",
    category: "Vet Checkup",
    description:
      "Comprehensive physical examination including temperature, pulse, and dental check.",
    price: 800,
    duration: "30 mins",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 2,
    name: "Full Grooming Package",
    category: "Grooming",
    description:
      "Includes shampoo, haircut, nail trimming, ear cleaning, and brushing.",
    price: 1200,
    duration: "1 hour",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1601758124513-1a7d0f1e9f5f?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 3,
    name: "Obedience Training (Basic)",
    category: "Training",
    description:
      "Basic obedience lessons covering sit, stay, recall, and leash manners.",
    price: 1500,
    duration: "45 mins",
    status: "Inactive",
    image:
      "https://images.unsplash.com/photo-1583511655633-1e84c1f1c5be?auto=format&fit=crop&w=600&q=60",
  },
];

function AdminServicePage() {
  const email = "admin@demo.com";
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(dummyServices);
  const [statusFilter, setStatusFilter] = useState("All");
  const [editing, setEditing] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    status: "Active",
    image: null,
    imagePreview: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const filtered = services.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && s.status === "Active") ||
      (statusFilter === "Inactive" && s.status === "Inactive");

    return matchesSearch && matchesStatus;
  });

  const handleSubmit = () => {
    if (editing && selectedService) {
      const updated = services.map((svc) =>
        svc.id === selectedService.id
          ? {
              ...svc,
              name: form.name,
              category: form.category,
              description: form.description,
              price: form.price,
              duration: form.duration,
              status: form.status,
              image: form.imagePreview || svc.image,
            }
          : svc
      );
      setServices(updated);
    } else {
      const newService = {
        id: services.length + 1,
        name: form.name,
        category: form.category,
        description: form.description,
        price: form.price,
        duration: form.duration,
        status: form.status || "Active",
        image: form.imagePreview,
      };
      setServices([...services, newService]);
    }
    setOpen(false);
    setEditing(false);
    setSelectedService(null);
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
          Service Management
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
                Add Service
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
                <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Service Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((s) => (
                <TableRow
                  key={s.id}
                  hover
                  sx={{ "&:hover": { background: "rgba(84,162,217,0.08)" } }}
                >
                  {/* Image */}
                  <TableCell>
                    <Avatar
                      src={s.image}
                      alt={s.name}
                      variant="rounded"
                      sx={{
                        width: 60,
                        height: 60,
                        border: "2px solid #54A2D9",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>

                  {/* Name */}
                  <TableCell>
                    <Typography variant="body1" fontWeight={600}>
                      {s.name}
                    </Typography>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Typography variant="body2">{s.category}</Typography>
                  </TableCell>

                  {/* Description */}
                  <TableCell sx={{ maxWidth: 250 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      title={s.description}
                    >
                      {s.description}
                    </Typography>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      ₹{s.price}
                    </Typography>
                  </TableCell>

                  {/* Duration */}
                  <TableCell>
                    <Typography variant="body2">{s.duration}</Typography>
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
                            s.status === "Active" ? "#4CAF50" : "#F44336",
                          boxShadow: `0 0 6px ${
                            s.status === "Active"
                              ? "rgba(76,175,80,0.6)"
                              : "rgba(244,67,54,0.6)"
                          }`,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: s.status === "Active" ? "#2E7D32" : "#C62828",
                          fontWeight: 600,
                        }}
                      >
                        {s.status}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center" sx={{ width: 100 }}>
                    <IconButton
                      onClick={() => {
                        setEditing(true);
                        setSelectedService(s);
                        setForm({
                          name: s.name,
                          category: s.category,
                          description: s.description,
                          price: s.price,
                          duration: s.duration,
                          status: s.status,
                          imagePreview: s.image,
                        });
                        setOpen(true);
                      }}
                    >
                      <Edit3 size={18} color="#3C8AC6" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        setServices(services.filter((x) => x.id !== s.id))
                      }
                    >
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
              {editing ? "Edit Service" : "Add Service"}
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
            {/* Basic Info */}
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
              Service Details
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
                {/* Service Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Service Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Grid>

                {/* Category */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    name="category"
                    value={form.category || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Select Category</em>
                    </MenuItem>
                    <MenuItem value="Vet Checkup">Vet Checkup</MenuItem>
                    <MenuItem value="Grooming">Grooming</MenuItem>
                    <MenuItem value="Training">Training</MenuItem>
                    <MenuItem value="Boarding">Boarding</MenuItem>
                  </TextField>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </Grid>

                {/* Price */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Price (₹)"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                  />
                </Grid>

                {/* Duration */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Duration"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g., 30 mins / 1 hour"
                  />
                </Grid>

                {/* Status */}
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
              </Grid>
            </Paper>

            {/* Image Upload */}
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
              Service Image
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
                <Grid item xs={12}>
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
                      document.getElementById("serviceImageInput").click()
                    }
                  >
                    {form.imagePreview ? (
                      <img
                        src={form.imagePreview}
                        alt="Service"
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
                          Click to upload service image
                        </Typography>
                      </>
                    )}
                    <input
                      id="serviceImageInput"
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
                  transform: "scale(1.03)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              Save Service
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default AdminServicePage;