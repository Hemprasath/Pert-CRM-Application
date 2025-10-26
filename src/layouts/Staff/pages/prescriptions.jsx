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
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Card,
} from "@mui/material";
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Mail,
  User2,
  Phone,
  PlusCircle,
  Stethoscope,
  Calendar,
  Clock,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import PetRecords from "./petRecords";


const drawerWidth = 260;

const dummyPrescriptions = [
  {
    id: 1,
    customerName: "Ameen Pasha",
    email: "ameen@example.com",
    phone: "+91 9876543210",
    city: "Bangalore",
    state: "Karnataka",
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
    notes: "Regular check-up",
    prescriptions: [
      {
        medicine: "Amoxicillin 500mg",
        doctor: "Dr. Neha Rao",
        date: "18 Sep 2025",
        dosage: "1 capsule thrice daily",
        notes: "Avoid empty stomach",
      },
    ],
  },
  {
    id: 2,
    customerName: "Sana Iqbal",
    email: "sana@example.com",
    phone: "+91 9123456780",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    zip: "500001",
    petName: "Milo",
    petType: "Cat",
    petBreed: "Persian",
    petGender: "Female",
    petAge: "2 years",
    doctor: "Dr. Priya Mehta",
    doctorCategory: "Feline Specialist",
    date: "2025-10-12",
    time: "2:30 PM",
    notes: "Fever and loss of appetite",
    prescriptions: [
      {
        medicine: "Paracetamol 250mg",
        doctor: "Dr. Priya Mehta",
        date: "19 Sep 2025",
        dosage: "Half tablet twice daily",
        notes: "After food only",
      },
    ],
  },
];

function Prescriptions() {
  const email = "admin@demo.com";
  const [appointments, setAppointments] = useState(dummyPrescriptions);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(null);
  const [viewPet, setViewPet] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [errors, setErrors] = useState({});


  const [form, setForm] = useState({
    customerName: "",
    petName: "",
    existingPrescriptions: [],
    medicine: "",
    prescriptionDoctor: "",
    prescriptionDate: "",
    prescriptionTime: "",
    dosage: "",
    notes: "",
  });

  // 🔍 Filter for search
  const filteredAppointments = appointments.filter((a) => {
    const term = search.toLowerCase();
    return (
      a.customerName.toLowerCase().includes(term) ||
      a.email.toLowerCase().includes(term) ||
      a.petName.toLowerCase().includes(term) ||
      a.petType.toLowerCase().includes(term)
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setEditing(false);
    setForm({
      customerName: "",
      petName: "",
      existingPrescriptions: [],
      medicine: "",
      prescriptionDoctor: "",
      prescriptionDate: "",
      dosage: "",
      notes: "",
    });
    setOpen(true);
  };

  const handleEdit = (appt) => {
    setEditing(true);
    setSelected(appt);
    setForm({
      customerName: appt.customerName,
      petName: appt.petName,
      existingPrescriptions: appt.prescriptions || [],
      medicine: "",
      prescriptionDoctor: "",
      prescriptionDate: "",
      prescriptionTime: "",
      dosage: "",
      notes: "",
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const handleSubmit = () => {
    const newPrescription = {
      medicine: form.medicine,
      doctor: form.prescriptionDoctor,
      date: form.prescriptionDate,
      time: form.prescriptionTime,
      dosage: form.dosage,
      notes: form.notes,
    };

    setAppointments((prev) =>
      prev.map((a) => {
        if (
          a.customerName === form.customerName &&
          a.petName === form.petName
        ) {
          return {
            ...a,
            prescriptions: [...(a.prescriptions || []), newPrescription],
          };
        }
        return a;
      })
    );

    setOpen(false);
    setEditing(false);
    setSelected(null);
  };

  const handleViewPetRecord = (pet) => {
    setViewPet(pet);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewPet(null);
  };
  const validate = () => {
    let newErrors = {};

    if (!form.customerName) newErrors.customerName = "Customer is required";
    if (!form.petName) newErrors.petName = "Pet name is required";
    if (!form.medicine) newErrors.medicine = "Medicine name is required";
    if (!form.prescriptionDoctor)
      newErrors.prescriptionDoctor = "Doctor selection is required";
    if (!form.prescriptionDate) newErrors.prescriptionDate = "Date is required";
    if (!form.prescriptionTime) newErrors.prescriptionTime = "Time is required";
    if (!form.dosage) newErrors.dosage = "Dosage instructions are required";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      handleSubmit();
    }
  };

  return (
    <>
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
        }}
      >
        <Toolbar />
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
          Prescriptions
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

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              onClick={handleAdd}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1.2,
                background:
                  "linear-gradient(135deg, rgba(84,162,217,1), rgba(44,94,120,1))",
              }}
            >
              Add Prescription
            </Button>
          </motion.div>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#E0F2FE" }}>
                <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Contact Info</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Pet Prescription</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Doctor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date & Time</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredAppointments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <User2 size={18} color="#0A1F44" />
                      <Typography fontWeight={600}>{a.customerName}</Typography>
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

                  <TableCell>
                    {a.petName} ({a.petType})
                    <IconButton
                      size="small"
                      onClick={() => handleViewPetRecord(a)}
                    >
                      <PlusCircle size={16} />
                    </IconButton>
                  </TableCell>

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

        {/* Add/Edit Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle
            sx={{
              fontWeight: 600,
              color: "#eef0f3ff",
              backgroundColor: "#7a97bdff",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            {editing ? "Edit Prescription" : "Add New Prescription"}
          </DialogTitle>

          <DialogContent dividers>
            <Stack spacing={2} mt={1}>
              {/* Customer + Pet Selection */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                  flexWrap: "wrap",
                }}
              >
                {/* Customer Name */}
                <FormControl fullWidth sx={{ flex: 1 }} error={!!errors.customerName}>
                  <InputLabel>Customer Name</InputLabel>
                  <Select
                    name="customerName"
                    value={form.customerName || ""}
                    label="Customer Name"
                    onChange={(e) => {
                      const selectedName = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        customerName: selectedName,
                        petName: "",
                        existingPrescriptions: [],
                      }));
                      setErrors((prev) => ({ ...prev, customerName: "" }));
                    }}
                  >
                    {appointments
                      .reduce((acc, appt) => {
                        if (!acc.includes(appt.customerName)) acc.push(appt.customerName);
                        return acc;
                      }, [])
                      .map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.customerName && (
                    <Typography variant="caption" color="error">
                      {errors.customerName}
                    </Typography>
                  )}
                </FormControl>

                {/* Pet Name */}
                <FormControl
                  fullWidth
                  disabled={!form.customerName}
                  sx={{ flex: 1 }}
                  error={!!errors.petName}
                >
                  <InputLabel>Pet Name</InputLabel>
                  <Select
                    name="petName"
                    value={form.petName || ""}
                    label="Pet Name"
                    onChange={(e) => {
                      const petName = e.target.value;
                      const petData = appointments.find(
                        (a) =>
                          a.customerName === form.customerName &&
                          a.petName === petName
                      );
                      setForm((prev) => ({
                        ...prev,
                        petName,
                        existingPrescriptions: petData?.prescriptions || [],
                      }));
                      setErrors((prev) => ({ ...prev, petName: "" }));
                    }}
                  >
                    {appointments
                      .filter((a) => a.customerName === form.customerName)
                      .map((a) => (
                        <MenuItem key={a.petName} value={a.petName}>
                          {a.petName} ({a.petType})
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.petName && (
                    <Typography variant="caption" color="error">
                      {errors.petName}
                    </Typography>
                  )}
                </FormControl>
              </Box>

              {/* Add Prescription Details */}
              <Box mt={2}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#0A1F44", mb: 2 }}
                >
                  Add Prescription Details
                </Typography>

                {/* Medicine + Doctor */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Medicine"
                    name="medicine"
                    value={form.medicine || ""}
                    onChange={(e) => {
                      handleChange(e);
                      setErrors((prev) => ({ ...prev, medicine: "" }));
                    }}
                    error={!!errors.medicine}
                    helperText={errors.medicine}
                    placeholder="Enter medicine name"
                    sx={{ flex: 1 }}
                  />

                  <FormControl fullWidth sx={{ flex: 1 }} error={!!errors.prescriptionDoctor}>
                    <InputLabel>Doctor</InputLabel>
                    <Select
                      name="prescriptionDoctor"
                      value={form.prescriptionDoctor || ""}
                      onChange={(e) => {
                        handleChange(e);
                        setErrors((prev) => ({ ...prev, prescriptionDoctor: "" }));
                      }}
                      label="Doctor"
                    >
                      <MenuItem value="">Select a Doctor</MenuItem>
                      <MenuItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</MenuItem>
                      <MenuItem value="Dr. Arjun Mehta">Dr. Arjun Mehta</MenuItem>
                      <MenuItem value="Dr. Emily Carter">Dr. Emily Carter</MenuItem>
                      <MenuItem value="Dr. Rohan Das">Dr. Rohan Das</MenuItem>
                      <MenuItem value="Dr. Priya Nair">Dr. Priya Nair</MenuItem>
                    </Select>
                    {errors.prescriptionDoctor && (
                      <Typography variant="caption" color="error">
                        {errors.prescriptionDoctor}
                      </Typography>
                    )}
                  </FormControl>
                </Box>

                {/* Date + Time */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Date"
                    name="prescriptionDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={form.prescriptionDate || ""}
                    onChange={(e) => {
                      handleChange(e);
                      setErrors((prev) => ({ ...prev, prescriptionDate: "" }));
                    }}
                    error={!!errors.prescriptionDate}
                    helperText={errors.prescriptionDate}
                    inputProps={{
                      min: new Date().toISOString().split("T")[0], // 👈 disables past dates
                    }}
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        "& fieldset": { borderColor: "#D0D7DE" },
                        "&.Mui-focused fieldset": { borderColor: "#54A2D9" },
                      },
                      "& .MuiInputBase-input": {
                        p: 1.4,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Time"
                    name="prescriptionTime"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={form.prescriptionTime || ""}
                    onChange={(e) => {
                      handleChange(e);
                      setErrors((prev) => ({ ...prev, prescriptionTime: "" }));
                    }}
                    error={!!errors.prescriptionTime}
                    helperText={errors.prescriptionTime}
                    sx={{ flex: 1 }}
                  />
                </Box>

                {/* Dosage + Notes */}
                <TextField
                  fullWidth
                  label="Dosage Instructions"
                  name="dosage"
                  value={form.dosage || ""}
                  onChange={handleChange}
                  placeholder="e.g. 1 tablet twice daily after meals"
                  error={Boolean(errors.dosage)}
                  helperText={errors.dosage}
                  sx={{
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      "& fieldset": { borderColor: "#D0D7DE" },
                      "&.Mui-focused fieldset": { borderColor: "#54A2D9" },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#555",
                      fontWeight: 400,
                    },
                    "& .MuiInputBase-input": {
                      p: 1.4,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes"
                  name="notes"
                  value={form.notes || ""}
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                />
              </Box>
            </Stack>
          </DialogContent>

          {/* Actions */}
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={onSubmit}>
              {editing ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>

     
        {/* View Pet Dialog */}
        {viewPet && (
          <Dialog
            open={openViewDialog}
            onClose={handleCloseViewDialog}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle
              sx={{
                fontWeight: 600,
                color: "#1976d2",
                backgroundColor: "#a9bfdbff",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              Prescription Details — {viewPet.petName}
            </DialogTitle>

            <DialogContent dividers sx={{ backgroundColor: "#fafcff" }}>
              {/* Customer Info Section */}
              <Typography
                variant="h6"
                sx={{ color: "#1976d2", mb: 1, fontWeight: 600 }}
              >
                Customer Information
              </Typography>

              <Card
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 2,
                  backgroundColor: "#f8f9fa",
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.05)",
                }}
              >
                <Stack spacing={1.2}>
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
                    <strong>Location:</strong> {viewPet.city}, {viewPet.state}
                  </Typography>
                </Stack>
              </Card>

              <Divider sx={{ my: 2 }} />


              {/* Prescription Section */}
              <Typography
                variant="h6"
                sx={{ color: "#1976d2", mb: 1, fontWeight: 600 }}
              >
                Prescription Details
              </Typography>

              {viewPet.prescriptions?.length > 0 ? (
                viewPet.prescriptions.map((p, i) => (
                  <Card
                    key={i}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      borderColor: "#e0e0e0",
                      backgroundColor: "#f7fafcff",
                    }}
                  >
                    <Stack spacing={1.2}>
                      <Typography>
                        <strong>Medicine:</strong> {p.medicine}
                      </Typography>
                      <Typography>
                        <strong>Doctor:</strong> {p.doctor}
                      </Typography>
                      <Typography>
                        <strong>Date:</strong> {p.date}
                      </Typography>
                      <Typography>
                        <strong>Dosage:</strong> {p.dosage}
                      </Typography>
                      {p.notes && (
                        <Typography>
                          <strong>Notes:</strong> {p.notes}
                        </Typography>
                      )}
                    </Stack>
                  </Card>
                ))
              ) : (
                <Typography sx={{ color: "text.secondary", mt: 1 }}>
                  No prescriptions available
                </Typography>
              )}
            </DialogContent>

            <DialogActions sx={{ p: 2, backgroundColor: "#f1f6fc" }}>
              <Button
                onClick={handleCloseViewDialog}
                variant="contained"
                sx={{
                  backgroundColor: "#1976d2",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}



      </Box>
    </Box>
    <PetRecords appointmentsdata={appointments} data = {form} viewPet  = {viewPet}/>
    </>
  );
}

export default Prescriptions;
