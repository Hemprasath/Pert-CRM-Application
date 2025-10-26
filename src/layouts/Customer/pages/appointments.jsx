import React, { useMemo, useState } from "react";
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
  TableSortLabel,
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
  Stack,
  Modal,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Search, Filter, Plus, Edit3, Trash2, X, Eye, PawPrint, Calendar, User, Droplet, Activity, Heart, Mars, Venus, Cpu, FileText, UserCheck, Briefcase, Clock, Watch, File, Flag, MessageCircle, Coffee, AlertCircle, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "react-phone-input-2/lib/material.css";
import { motion } from "framer-motion";
import charlieImg from "../assets/images/petDog.jpeg";
import mistyImg from "../assets/images/cat.jpeg";
import buddyImg from "../assets/images/DOg.png";

const drawerWidth = 260;

const dummyAppointments = [
  {
    name: "Charlie",
    type: "Dog",
    breed: "Golden Retriever",
    gender: "Male",
    dob: "2020-10-15",
    age: 3,
    color: "Golden",
    weight: 30.5, // in kg
    bloodGroup: "DEA 1.1+",
    microchipNumber: "123456789ABC",
    allergies: "None",
    foodPreferences: "Chicken, Rice",
    behaviourNotes: "Friendly and energetic",
    profileImage: charlieImg,
    suggestedNotes: "Needs daily exercise",
    appointmentType: "Check-up",
    doctor: "Dr. John",
    doctorCategory: "Veterinarian",
    appointmentDateTime: "2025-10-10 10:00 AM",
    duration: "30 mins",
    notes: "Regular health check-up",
    status: "Pending",
  },

  {
    name: "Misty",
    type: "Cat",
    breed: "Persian",
    gender: "Female",
    dob: "2021-05-10",
    age: 2,
    color: "White",
    weight: 4.2,
    bloodGroup: "B",
    microchipNumber: "987654321XYZ",
    allergies: "Lactose",
    foodPreferences: "Fish, Cat food",
    behaviourNotes: "Calm and affectionate",
    profileImage: mistyImg,
    suggestedNotes: "Regular grooming required",
    appointmentType: "Grooming",
    doctor: "Dr. Emily",
    doctorCategory: "Grooming Expert",
    appointmentDateTime: "2025-10-12 11:30 AM",
    duration: "1 hour",
    notes: "Full grooming session",
    status: "Approved",
  },

];

function CustomerAppointments() {
  const email = "customer@demo.com";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    country: "",
    zip: "",
    name: "",
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
  const [status, setStatus] = useState("All");


  const handleClose = () => setSelectedPet(null);

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

  const handleFilter = (e) =>{
    setStatusFilter(e.target.value)
  }
  const handleEdit = (appt) => {
    setEditing(true);
    setSelected(appt);
    setForm(appt);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const handleChanges = (e) => {
    setStatus(e.target.value);
    console.log("Selected status:", e.target.value);
  };

  const [orderBy, setOrderBy] = useState("appointmentDateTime");
  const [order, setOrder] = useState("asc");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

const filteredAppointments = useMemo(() => {
  return appointments.filter((item) => {
    // Status filter
    const statusMatch = status === "All" || item.status === status;

    // Search filter
    const searchText = search.toLowerCase();

    const searchMatch =
      (item.name && item.name.toLowerCase().includes(searchText)) ||
      (item.doctor && item.doctor.toLowerCase().includes(searchText)) ||
      (item.petType && item.petType.toLowerCase().includes(searchText)) ||
      (item.breed && item.breed.toLowerCase().includes(searchText));

    return statusMatch && searchMatch;
  });
}, [appointments, status, search]);


  // Sort the data based on order and orderBy
  const sortedAppointments = [...dummyAppointments].sort((a, b) => {
    let valA, valB;
    switch (orderBy) {
      case "name":
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        break;
      case "appointmentDateTime":
        valA = new Date(a.appointmentDateTime);
        valB = new Date(b.appointmentDateTime);
        break;
      case "appointmentType":
        valA = a.appointmentType.toLowerCase();
        valB = b.appointmentType.toLowerCase();
        break;
      case "status":
        valA = a.status.toLowerCase();
        valB = b.status.toLowerCase();
        break;
      default:
        valA = a.petName.toLowerCase();
        valB = b.petName.toLowerCase();
    }
    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

    const getPetIcon = (type) => {
      const t = (type || "").toLowerCase();
      // if (t.includes("dog")) return <Dog size={22} color="#1976D2" />;
      // if (t.includes("cat")) return <Cat size={22} color="#1976D2" />;
      // if (t.includes("bird")) return <Bird size={22} color="#1976D2" />;
      // if (t.includes("fish")) return <Fish size={22} color="#1976D2" />;
      // if (t.includes("rabbit")) return <Rabbit size={22} color="#1976D2" />;
      // return <PawPrint size={22} color="#1976D2" />;
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


        {/* Search + Add Button Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Left: Search Bar */} 
          <TextField
            variant="outlined"
            placeholder="Search by name or pet details..."
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

        <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} label="Status" onChange={handleChanges} size="small">
          <MenuItem value="All" sx={{ color: "#1E90FF" }}>All</MenuItem>
          <MenuItem value="Pending" sx={{ color: "#FFD700" }}>Pending</MenuItem>
          <MenuItem value="Approved" sx={{ color: "#32CD32" }}>Approved</MenuItem>
        </Select>
      </FormControl>


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
            {/* Add Customer Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                onClick={() => {
                  setEditing(false);
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
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 4,
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.08), inset 0 0 12px rgba(84,162,217,0.08)",
            background: "linear-gradient(145deg, #ffffff 70%, #f8fafc 30%)",
            p: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#E0F2FE" }}>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Pet Details
                  </TableSortLabel>
                </TableCell>

                <TableCell>
                  <TableSortLabel
                    active={orderBy === "appointmentType"}
                    direction={orderBy === "appointmentType" ? order : "asc"}
                    onClick={() => handleSort("appointmentType")}
                  >
                    Type
                  </TableSortLabel>
                </TableCell>

                <TableCell>Doctor</TableCell>

                <TableCell>
                  <TableSortLabel
                    active={orderBy === "appointmentDateTime"}
                    direction={
                      orderBy === "appointmentDateTime" ? order : "asc"
                    }
                    onClick={() => handleSort("appointmentDateTime")}
                  >
                    Date & Time
                  </TableSortLabel>
                </TableCell>

                <TableCell>
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : "asc"}
                    onClick={() => handleSort("status")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>

                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredAppointments.map((a) => (
                <TableRow key={a.id} hover>
                  {/* Pet Details */}
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(84,162,217,0.05)",
                        p: 1,
                        borderRadius: 2,
                      }}
                    >
                      <Box>
                        <Typography fontWeight={600}>
                          {a.name} ({a.type})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {a.breed}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => setSelectedPet(a)} //Button
                        sx={{ color: "#3C8AC6" }}
                      >
                        <Eye size={18} />
                      </IconButton>
                    </Box>
                  </TableCell>

                  {/* Appointment Type */}
                  <TableCell>
                    <Chip
                      label={a.appointmentType}
                      size="small"
                      sx={{
                        backgroundColor: "#FFF2CC",
                        color: "#B87D00",
                        fontWeight: 600,
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

                  {/* Appointment Date & Time */}
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {a.appointmentDateTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {a.duration}
                    </Typography>
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
                              : a.status === "Pending"
                              ? "#FFA726"
                              : "#2196F3",
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
        {/* Admin Appointment Modal */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: 4,
              background: 
                "linear-gradient(180deg, rgba(84,162,217,0.95), rgba(44,94,120,0.95))",
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
            {/* --- Pet Selection --- */}
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
                    select
                    fullWidth
                    label="Select Pet"
                    name="name"
                    value={form.petName || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true, // 👈 same behavior
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Pet</em>
                    </MenuItem>
                    {dummyAppointments.map((a) => (
                      <MenuItem key={a.id} value={a.name}>
                        {a.name} ({a.type})
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Paper>

            {/* --- Appointment Details --- */}
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
              Appointment Details
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
                {/* Appointment Type */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Appointment Type"
                    name="appointmentType"
                    value={form.appointmentType || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true, // 👈 same behavior
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Type</em>
                    </MenuItem>
                    <MenuItem value="Vaccination">Vaccination</MenuItem>
                    <MenuItem value="Check-up">Check-up</MenuItem>
                    <MenuItem value="Grooming">Grooming</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>

                {/* Doctor */}
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

                {/* Duration */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Duration"
                    name="duration"
                    value={form.duration || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true, // 👈 same behavior
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Duration</em>
                    </MenuItem>
                    <MenuItem value="30 mins">30 mins</MenuItem>
                    <MenuItem value="1 hour">1 hour</MenuItem>
                    <MenuItem value="1.5 hours">1.5 hours</MenuItem>
                  </TextField>
                </Grid>

                {/* Date & Time */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Date & Time"
                    name="appointmentDateTime"
                    value={form.appointmentDateTime || ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Notes */}
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
          </DialogContent>

          {/* Actions */}
          <DialogActions
            sx={{
              px: 4,
              py: 2.5,
              background: "#f8fafc",
              borderTop: "1px solid #e0e0e0",
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
                    "linear-gradient(180deg, rgba(84,162,217,0.95), rgba(44,94,120,0.95))",
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

<Modal
  open={!!selectedPet}
  onClose={handleClose}
  aria-labelledby="pet-details-title"
  aria-describedby="pet-details-description"
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: { xs: "95%", sm: 600, md: 700 },
      bgcolor: "background.paper",
      borderRadius: 4,
      p: { xs: 3, sm: 5 },
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
      borderLeft: "6px solid #4da3e1",
      borderRight: "6px solid #4da3e1",
      background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
    }}
  >
    {selectedPet && (
      <>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          mb={3}
        >
          <Avatar
            src={selectedPet.profileImage}
            alt={selectedPet.name}
            variant="rounded"
            sx={{
              width: { xs: "80%", sm: 150 },
              height: { xs: 200, sm: 150 },
              mr: { sm: 3 },
              mb: { xs: 2, sm: 0 },
              boxShadow: 5,
            }}
          />
          <Box textAlign={{ xs: "center", sm: "left" }}>
            <Typography variant="h4" fontWeight={700}>
              {selectedPet.name} Details
            </Typography>
            <Chip
              label={selectedPet.type}
              icon={getPetIcon(selectedPet.type)}
              sx={{
                mt: 1,
                fontWeight: 600,
                fontSize: 14,
                backgroundColor:
                  selectedPet.type === "Dog"
                    ? "#FFB74D"
                    : selectedPet.type === "Cat"
                    ? "#81C784"
                    : selectedPet.type === "Bird"
                    ? "#4FC3F7"
                    : selectedPet.type === "Rabbit"
                    ? "#BA68C8"
                    : "#E0E0E0",
                color: "#fff",
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

 
        <Grid container spacing={2} mb={3}>
           {[
    { label: "Breed", value: selectedPet.breed, icon: <PawPrint size={20} color="#8D6E63" style={{ marginRight: 8 }} /> },
    { label: "DOB", value: selectedPet.dob, icon: <Calendar size={20} color="#1976D2" style={{ marginRight: 8 }} /> },
    { label: "Age", value: `${selectedPet.age} yrs`, icon: <User size={20} color="#F57C00" style={{ marginRight: 8 }} /> },
    { label: "Color", value: selectedPet.color, icon: <Droplet size={20} color="#4CAF50" style={{ marginRight: 8 }} /> },
    { label: "Weight", value: `${selectedPet.weight} kg`, icon: <Activity size={20} color="#FF5722" style={{ marginRight: 8 }} /> },
    { label: "Blood Group", value: selectedPet.bloodGroup, icon: <Heart size={20} color="#E91E63" style={{ marginRight: 8 }} /> },
    { label: "Gender", value: selectedPet.gender, icon: selectedPet.gender === "Male" ? <Mars size={20} color="#2196F3" style={{ marginRight: 8 }} /> : <Venus size={20} color="#F48FB1" style={{ marginRight: 8 }} /> },
    { label: "Microchip Number", value: selectedPet.microchipNumber, icon: <Cpu size={20} color="#607D8B" style={{ marginRight: 8 }} /> },
    { label: "Appointment Type", value: selectedPet.appointmentType, icon: <FileText size={20} color="#795548" style={{ marginRight: 8 }} /> },
    { label: "Doctor", value: selectedPet.doctor, icon: <UserCheck size={20} color="#009688" style={{ marginRight: 8 }} /> },
    { label: "Doctor Category", value: selectedPet.doctorCategory, icon: <Briefcase size={20} color="#3F51B5" style={{ marginRight: 8 }} /> },
    { label: "Appointment Date & Time", value: selectedPet.appointmentDateTime, icon: <Clock size={20} color="#FF9800" style={{ marginRight: 8 }} /> },
    { label: "Duration", value: selectedPet.duration, icon: <Watch size={20} color="#9C27B0" style={{ marginRight: 8 }} /> },
    { label: "Notes", value: selectedPet.notes, icon: <File size={20} color="#607D8B" style={{ marginRight: 8 }} /> },
    { label: "Status", value: selectedPet.status, icon: <Flag size={20} color="#F44336" style={{ marginRight: 8 }} /> },
  ].map((item) => (
            <Grid item xs={6} display="flex" alignItems="center" key={item.label}>
              {item.icon}
              <Typography variant="body1">
                {item.label}: <strong>{item.value || "—"}</strong>
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 3 }} />


        <Box sx={{ backgroundColor: "#F5F5F5", p: 3, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Behaviour & Food
          </Typography>
          <Typography variant="body2" mb={0.5}>
            <strong>Notes:</strong> {selectedPet.behaviourNotes}
          </Typography>
          <Typography variant="body2" mb={0.5}>
            <strong>Food Preferences:</strong> {selectedPet.foodPreferences}
          </Typography>
          <Typography variant="body2" mb={0.5}>
            <strong>Allergies:</strong> {selectedPet.allergies || "None"}
          </Typography>
          {selectedPet.suggestedNotes && (
            <Typography variant="body2" color="primary" mt={1}>
              <strong>Suggested:</strong> {selectedPet.suggestedNotes}
            </Typography>
          )}
        </Box>


        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              background: "linear-gradient(135deg, #39517c, #4da3e1)",
              "&:hover": {
                background: "linear-gradient(135deg, #4da3e1, #39517c)",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </>
    )}
  </Box>
</Modal>


    </Box>
  );
}

export default CustomerAppointments;
