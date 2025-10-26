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
} from "@mui/material";
import {
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  Mail,
  User2,
  Phone,
  Stethoscope,
  Calendar,
  Clock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "react-phone-input-2/lib/material.css";

const drawerWidth = 260;

// Dummy Employee/Customer Data
// 🐾 Dummy Services Data
const dummyPetRecords = [
  {
    id: 1,
    customerName: "Ameen Pasha",
    email: "ameen@example.com",
    phone: "+91 9876543210",
    address: "123 Blue Street, Indiranagar",
    state: "Karnataka",
    city: "Bangalore",
    country: "India",
    zip: "560001",

    petName: "Buddy",
    petType: "Dog",
    petBreed: "Labrador Retriever",
    petGender: "Male",
    petAge: "3 years",
    weight: "28 kg",
    vaccinationStatus: "Up-to-date",
    lastVisit: "2025-06-20",

    doctor: "Dr. John Mathews",
    doctorCategory: "Veterinary Specialist",
    date: "2025-10-11",
    time: "10:00 AM",
    duration: "30 mins",
    notes: "Routine check-up and vaccination verification.",
    medicalNotes:
      "Healthy and active. Suggested regular walks and monthly grooming.",
    description:
      "Buddy visited for his annual health examination including heart rate, dental hygiene, and vaccination updates. All parameters normal.",
    status: "Completed",
        prescriptions: [
      {
        medicine: "Amoxicillin 500mg",
        doctor: "Dr. Neha Rao",
        date: "18 Sep 2025",
        dosage: "1 capsule thrice daily",
        notes: "Avoid empty stomach",
      },
    ],
        vaccinations: [
      {
        name: "Rabies",
        date: "2025-01-10",
        nextDue: "2026-01-10",
      },
      {
        name: "DHPP",
        date: "2025-02-15",
        nextDue: "2026-02-15",
      },
    ],
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
    address: "45 Green Avenue, Andheri West",
    state: "Maharashtra",
    city: "Mumbai",
    country: "India",
    zip: "400001",

    petName: "Misty",
    petType: "Cat",
    petBreed: "Persian",
    petGender: "Female",
    petAge: "2 years",
    weight: "5.2 kg",
    vaccinationStatus: "Due for booster (Rabies)",
    lastVisit: "2025-05-10",

    doctor: "Dr. Emily Carter",
    doctorCategory: "Grooming & Wellness Expert",
    date: "2025-10-12",
    time: "11:30 AM",
    duration: "1 hour",
    notes: "Full grooming and coat maintenance session.",
    medicalNotes: "Minor shedding observed. Recommended Omega-3 supplements.",
    description:
      "Misty had a complete grooming session with hygiene check. Vet advised dietary improvements and hydration for optimal coat health.",
    status: "Approved",
    prescriptions: [
      {
        medicine: "Paracetamol 250mg",
        doctor: "Dr. Priya Mehta",
        date: "19 Sep 2025",
        dosage: "Half tablet twice daily",
        notes: "After food only",
      },
    ],
     vaccinations: [
      {
        name: "Feline Rabies",
        date: "2025-03-10",
        nextDue: "2026-03-10",
      },
    ],
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

function PetRecords({ appointmentsdata ,data, viewPetdata}) {
  const email = "admin@demo.com";
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState(dummyPetRecords);
  const [petRecords, setPetRecords] = useState(dummyPetRecords);
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

const prescriptionsToShow = viewPet?.prescriptions || [];


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
          Pet Records
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
                <TableCell sx={{ fontWeight: 700 }}>Pet Record</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Doctor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date & Time</TableCell>
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
                      <Typography fontWeight={600}>{a.cusTableCelltomerName}</Typography>
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

                  {/* Pet Record */}
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
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleViewPetRecord(a)}
                        sx={{ color: "#3C8AC6" }}
                      >
                        <Eye size={18} />
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
                  "linear-gradient(180deg, rgba(84,162,217,0.95), rgba(44, 94, 120, 0.95))",
                backdropFilter: "blur(14px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              },
            }}
          >
            <DialogTitle sx={{ color: "#fff" }}>
              Pet Details: {viewPet.petName}
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
                <Typography>
                  <strong>Weight:</strong> {viewPet.weight}
                </Typography>
                <Typography>
                  <strong>Vaccination Status:</strong>{" "}
                  {viewPet.vaccinationStatus}
                </Typography>
                <Typography>
                  <strong>Last Visit:</strong> {viewPet.lastVisit}
                </Typography>
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

              {/* Notes & Description */}
              <Box
                mb={1}
                p={2}
                sx={{
                  borderRadius: 2,
                  background: "#F8FAFC",
                  boxShadow: "inset 0 0 10px rgba(84,162,217,0.05)",
                }}
              >
                <Typography fontWeight={700} mb={1} color="#54A2D9">
                  Medical Notes
                </Typography>
                <Typography variant="body2">{viewPet.medicalNotes}</Typography>
                <Typography fontWeight={700} mb={1} color="#54A2D9">
                  Description
                </Typography>
                <Typography variant="body2">{viewPet.description}</Typography>
              </Box>

{/* Prescription Details */}
 {prescriptionsToShow.length > 0 && (
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
            Prescription Details
          </Typography>

          {prescriptionsToShow.map((presc, index) => (
            <Box key={index} mb={2} sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
              <Typography>
                <strong>Medicine:</strong> {presc.medicine || "—"}
              </Typography>
              <Typography>
                <strong>Doctor:</strong> {presc.doctor || "—"}
              </Typography>
              <Typography>
                <strong>Date:</strong> {presc.date || "—"}
              </Typography>
              <Typography>
                <strong>Dosage:</strong> {presc.dosage || "—"}
              </Typography>
              <Typography>
                <strong>Notes:</strong> {presc.notes || "—"}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Vaccination Details */}
{viewPet.vaccinations && viewPet.vaccinations.length > 0 && (
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
      Vaccination Details
    </Typography>

    {viewPet.vaccinations.map((vax, index) => (
      <Box key={index} mb={2} sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
        <Typography>
          <strong>Name:</strong> {vax.name || "—"}
        </Typography>
        <Typography>
          <strong>Date:</strong> {vax.date || "—"}
        </Typography>
        <Typography>
          <strong>Next Due:</strong> {vax.nextDue || "—"}
        </Typography>
      </Box>
    ))}
  </Box>
)}

{/* History Details */}
{viewPet.history && viewPet.history.length > 0 && (
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

    {viewPet.history.map((record, index) => (
      <Box key={index} mb={2} sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
        <Typography>
          <strong>Appointment Date:</strong> {record.appointmentDate || "—"}
        </Typography>
        <Typography>
          <strong>Doctor:</strong> {record.doctor || "—"}
        </Typography>
        <Typography>
          <strong>Treatment:</strong> {record.treatment || "—"}
        </Typography>
        <Typography>
          <strong>Notes:</strong> {record.notes || "—"}
        </Typography>

        {/* History Vaccinations */}
        {record.vaccinations && record.vaccinations.length > 0 && (
          <Box ml={2} mt={1}>
            <Typography fontWeight={600}>Vaccinations:</Typography>
            {record.vaccinations.map((v, i) => (
              <Typography key={i} variant="body2">
                {v.name} - {v.date} (Next Due: {v.nextDue})
              </Typography>
            ))}
          </Box>
        )}

        {/* History Prescriptions */}
        {record.prescriptions && record.prescriptions.length > 0 && (
          <Box ml={2} mt={1}>
            <Typography fontWeight={600}>Prescriptions:</Typography>
            {record.prescriptions.map((p, i) => (
              <Typography key={i} variant="body2">
                {p.medicineName} - {p.dosage}, {p.frequency}, {p.duration} (
                {p.instructions})
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    ))}
  </Box>
)}
 

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

export default PetRecords;
