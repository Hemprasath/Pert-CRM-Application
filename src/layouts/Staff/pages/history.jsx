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
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Mail,
  User2,
  Phone,
  X,
  Stethoscope,
  Calendar,
  Clock,
  History,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import { motion } from "framer-motion";

const drawerWidth = 260;

// Dummy Employee/Customer Data
// 🐾 Dummy Services Data
const dummyHistoryData = [
  {
    id: 1,
    customerName: "Ameen Pasha",
    email: "ameen@example.com",
    phone: "+91 9876543210",
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
    history: [
      {
        appointmentDate: "2025-01-10",
        doctor: "Dr. John",
        treatment: "General Check-up",
        vaccinations: [
          { name: "Rabies", date: "2025-01-10", nextDue: "2026-01-10" },
        ],
        prescriptions: [
          {
            medicineName: "Paracetamol",
            dosage: "5 mg",
            frequency: "Twice a day",
            duration: "5 days",
            instructions: "Give after meals",
          },
        ],
        notes: "Pet was healthy, no issues.",
      },
      {
        appointmentDate: "2025-02-15",
        doctor: "Dr. John",
        treatment: "DHPP Vaccine",
        vaccinations: [
          { name: "DHPP", date: "2025-02-15", nextDue: "2026-02-15" },
        ],
        prescriptions: [],
        notes: "Vaccination administered successfully.",
      },
    ],
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
    status: "Completed",
    history: [
      {
        appointmentDate: "2025-03-10",
        doctor: "Dr. Emily",
        treatment: "Feline Rabies Vaccine",
        vaccinations: [
          { name: "Feline Rabies", date: "2025-03-10", nextDue: "2026-03-10" },
        ],
        prescriptions: [
          {
            medicineName: "Flea Treatment",
            dosage: "2 ml",
            frequency: "Once",
            duration: "1 day",
            instructions: "Apply on back of the neck",
          },
        ],
        notes: "Pet groomed and vaccinated.",
      },
    ],
  },
];

function Vaccinations() {
  const email = "admin@demo.com";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedService, setSelectedService] = useState(null);
  const [appointments, setAppointments] = useState(dummyHistoryData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(null);
  const [viewPet, setViewPet] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const handleViewPetRecord = (pet) => {
    setViewPet(pet);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewPet(null);
  };

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
          History
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
                Add History
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
                <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Contact Info</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Pet History</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Doctor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date & Time</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id} hover>
                  {/* Customer */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <User2 size={18} color="#0A1F44" />
                      <Typography fontWeight={600}>{a.customerName}</Typography>
                    </Box>
                  </TableCell>

                  {/* Contact Info */}
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
                        <Mail size={15} color="#54A2D9" />
                        <Typography variant="body2">{a.email}</Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Phone size={15} color="#0A1F44" />
                        <Typography variant="body2">{a.phone}</Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", fontSize: "0.8rem" }}
                      >
                        {a.city}, {a.state}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Pet Prescription */}
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
                          {a.petName} ({a.petType})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {a.petBreed}
                        </Typography>
                        {a.prescriptions && a.prescriptions.length > 0 && (
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            {a.prescriptions.length} medicine
                            {a.prescriptions.length > 1 ? "s" : ""}
                          </Typography>
                        )}
                      </Box>

                      <IconButton
                        size="small"
                        onClick={() => handleViewPetRecord(a)}
                        sx={{ color: "#3C8AC6" }}
                        title="View Vaccinations"
                      >
                        <History size={18} />
                      </IconButton>
                    </Box>
                  </TableCell>

                  {/* Doctor */}
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.3,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Stethoscope size={15} color="#2196F3" />
                        <Typography fontWeight={600}>{a.doctor}</Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", fontSize: "0.8rem" }}
                      >
                        {a.doctorCategory}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Appointment */}
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.3,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Calendar size={14} color="#1976D2" />
                        <Typography variant="body2" fontWeight={600}>
                          {a.date}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Clock size={14} color="#1976D2" />
                        <Typography variant="body2">{a.time}</Typography>
                      </Box>
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
                            a.status === "Pending"
                              ? "#FFB300"
                              : a.status === "Completed"
                              ? "#2196F3"
                              : "#D32F2F",
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
        {/* Dialog for Pet Prescription Details */}
        {viewPet && (
          <Dialog
            open={openViewDialog}
            onClose={handleCloseViewDialog}
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
            <DialogTitle sx={{ color: "#fff" }}>
              Pet & Vaccination Details: {viewPet.petName}
            </DialogTitle>
            <DialogContent sx={{ p: 4, background: "#ffffff" }}>
              {/* Customer Info */}
              <Box
                mb={3}
                p={2}
                sx={{
                  borderRadius: 2,
                  background: "#F8FAFC",
                  boxShadow: "inset 0 0 10px rgba(84,162,217,0.05)",
                }}
              >
                <Typography fontWeight={700} mb={1} color="#54A2D9">
                  Customer Information
                </Typography>
                <Typography>
                  <strong>Name:</strong> {viewPet.customerName}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {viewPet.email}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {viewPet.phone}
                </Typography>
                <Typography>
                  <strong>Location:</strong> {viewPet.city}, {viewPet.state},{" "}
                  {viewPet.country} - {viewPet.zip}
                </Typography>
              </Box>

              {/* Pet Info */}
              <Box
                mb={3}
                p={2}
                sx={{
                  borderRadius: 2,
                  background: "#F8FAFC",
                  boxShadow: "inset 0 0 10px rgba(84,162,217,0.05)",
                }}
              >
                <Typography fontWeight={700} mb={1} color="#54A2D9">
                  Pet Information
                </Typography>
                <Typography>
                  <strong>Name:</strong> {viewPet.petName}
                </Typography>
                <Typography>
                  <strong>Type:</strong> {viewPet.petType}
                </Typography>
                <Typography>
                  <strong>Breed:</strong> {viewPet.petBreed}
                </Typography>
                <Typography>
                  <strong>Gender:</strong> {viewPet.petGender}
                </Typography>
                <Typography>
                  <strong>Age:</strong> {viewPet.petAge}
                </Typography>
              </Box>

              {/* Vaccination Info */}
              <Box
                mb={3}
                p={2}
                sx={{
                  borderRadius: 2,
                  background: "#F8FAFC",
                  boxShadow: "inset 0 0 10px rgba(84,162,217,0.05)",
                }}
              >
                <Typography fontWeight={700} mb={1} color="#54A2D9">
                  History
                </Typography>

                {viewPet.history && viewPet.history.length > 0 ? (
                  viewPet.history.map((h, index) => (
                    <Box
                      key={index}
                      mb={2}
                      sx={{ borderBottom: "1px solid #e0e0e0", pb: 1 }}
                    >
                      <Typography>
                        <strong>Appointment Date:</strong> {h.appointmentDate}
                      </Typography>
                      <Typography>
                        <strong>Doctor:</strong> {h.doctor}
                      </Typography>
                      <Typography>
                        <strong>Treatment:</strong> {h.treatment}
                      </Typography>

                      {/* Vaccinations */}
                      {h.vaccinations && h.vaccinations.length > 0 && (
                        <Box sx={{ ml: 2, mt: 0.5 }}>
                          <Typography fontWeight={600}>
                            Vaccinations:
                          </Typography>
                          {h.vaccinations.map((v, idx) => (
                            <Typography key={idx} variant="body2">
                              {v.name} | Date: {v.date} | Next Due: {v.nextDue}
                            </Typography>
                          ))}
                        </Box>
                      )}

                      {/* Prescriptions */}
                      {h.prescriptions && h.prescriptions.length > 0 && (
                        <Box sx={{ ml: 2, mt: 0.5 }}>
                          <Typography fontWeight={600}>
                            Prescriptions:
                          </Typography>
                          {h.prescriptions.map((p, idx) => (
                            <Typography key={idx} variant="body2">
                              {p.medicineName} | {p.dosage} | {p.frequency} |
                              Duration: {p.duration} | {p.instructions}
                            </Typography>
                          ))}
                        </Box>
                      )}

                      {/* Notes */}
                      {h.notes && (
                        <Typography sx={{ mt: 0.5 }}>
                          <strong>Notes:</strong> {h.notes}
                        </Typography>
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">
                    No history data available
                  </Typography>
                )}
              </Box>

              {/* Doctor Info */}
              <Box
                mb={3}
                p={2}
                sx={{
                  borderRadius: 2,
                  background: "#F8FAFC",
                  boxShadow: "inset 0 0 10px rgba(84,162,217,0.05)",
                }}
              >
                <Typography fontWeight={700} mb={1} color="#54A2D9">
                  Doctor Information
                </Typography>
                <Typography>
                  <strong>Name:</strong> {viewPet.doctor}
                </Typography>
                <Typography>
                  <strong>Category:</strong> {viewPet.doctorCategory}
                </Typography>
              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                justifyContent: "flex-end",
                background: "#f8fafc",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <Button onClick={handleCloseViewDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Box>
  );
}

export default Vaccinations;
