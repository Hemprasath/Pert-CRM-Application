import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Stack,
  Divider,
  CssBaseline,
  Toolbar,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  PlusCircle,
  Pencil,
  Trash,
  Filter,
  Search,
  Plus,
  X,
  User2,
  UserCheck,
  Trash2
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

const drawerWidth = 260;

// Dummy doctors and caregivers
const doctors = [
  { name: "Dr. Smith", category: "Neurologist" },
  { name: "Dr. Johnson", category: "Cardiologist" },
];

const caregivers = [
  { name: "Dr. Ram", category: "Dermatologist" },
  { name: "Dr. Hock", category: "Oncologist" },
];

// Dummy notes
const initialNotes = [
  {
    createdBy: "Staff",
    description:
      "Patient requires regular monitoring for blood pressure, Schedule follow-up visit for allergy treatment.",
    assignedTo: "Dr. Smith - Neurologist",
  },
  {
    createdBy: "Staff",
    description:
      "Schedule follow-up visit for allergy treatment,Administer vaccine booster for rabies.",
    assignedTo: "Dr. Ram - Dermatologist",
  },
  {
    createdBy: "Staff",
    description:
      "Administer vaccine booster for rabies,Monitor pet diet and schedule blood test next week.",
    assignedTo: "Dr. Johnson - Cardiologist",
  },
  {
    createdBy: "Staff",
    description:
      "Monitor pet diet and schedule blood test next week,Patient requires regular monitoring.",
    assignedTo: "Dr. Hock - Oncologist",
  },
];

export default function InternalNotes() {
  const email = "staff@demo.com";
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

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

  const handleSave = () => {
    if (!description || !assignedTo) {
      alert("Please fill all fields!");
      return;
    }

    const noteData = {
      createdBy: "Admin",
      description,
      assignedTo,
    };

    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = noteData;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, noteData]);
    }

    setDescription("");
    setAssignedTo("");
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const note = notes[index];
    setDescription(note.description);
    setAssignedTo(note.assignedTo);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setDescription("");
    setAssignedTo("");
    setEditIndex(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar email={email} />
      <Sidebar />
      {/* Header */}
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
          Internal Notes
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
            {/* Add Customer Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                onClick={() => setShowForm(true)}
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
                Create Note
              </Button>
            </motion.div>
          </Stack>
        </Box>

        {/* Notes Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 3,
          }}
        >
          {notes.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", gridColumn: "1/-1", py: 5 }}
            >
              No notes available. Click "Create Note" to add one.
            </Typography>
          ) : (
            notes.map((note, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 3,
                  p: 2,
                  position: "relative",
                  background:
                    "linear-gradient(135deg, #ffffff 80%, #e3f2fd 20%)",
                  boxShadow:
                    "0 8px 20px rgba(0,0,0,0.1), inset 0 0 10px rgba(84,162,217,0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: 3,
                    background:
                      "linear-gradient(145deg, rgba(173,216,230,0.15), rgba(255,255,255,0.05))",
                    zIndex: 0,
                  },
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.02)",
                    boxShadow:
                      "0 12px 32px rgba(0,0,0,0.15), inset 0 0 15px rgba(84,162,217,0.15)",
                  },
                }}
              >
                <CardContent sx={{ position: "relative", zIndex: 1 }}>
                  {/* Created By */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      gap: 1,
                      color: "#1976D2",
                    }}
                  >
                    <User2 size={18} />
                    <Typography variant="body2" fontWeight={600}>
                      {note.createdBy}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      minHeight: 70,
                      color: "#0A1F44",
                      fontWeight: 500,
                    }}
                  >
                    {note.description}
                  </Typography>

                  {/* Assign To */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                      color: "#0A1F44",
                    }}
                  >
                    <UserCheck size={16} />
                    <Typography variant="body2">{note.assignedTo}</Typography>
                  </Box>

                  <Divider sx={{ mb: 1 }} />

                  {/* Actions */}
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton
                      size="small"
                      sx={{ color: "#1976D2" }}
                      onClick={() => handleEdit(index)}
                    >
                      <Pencil size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: "#D32F2F" }}
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Box>

        {/* Form Modal */}
        {showForm && (
          <Dialog
            open={showForm}
            onClose={handleCancel}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              sx: {
                borderRadius: 4,
                background:
                  "linear-gradient(180deg, rgba(243,244,245,0.95), rgba(230,235,240,0.95))",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 3,
                py: 2,
                background: "linear-gradient(90deg, #39517c, #4da3e1)",
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}
              >
                {editIndex !== null ? "Edit Note" : "Create Note"}
              </Typography>
              <IconButton onClick={handleCancel} sx={{ color: "#fff" }}>
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
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                variant="outlined"
                sx={{ mb: 3 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                select
                fullWidth
                label="Assign To"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="">
                  <em>Select...</em>
                </MenuItem>
                {doctors.map((doc, idx) => (
                  <MenuItem
                    key={`doc-${idx}`}
                    value={`${doc.name} - ${doc.category}`}
                  >
                    {doc.name} - {doc.category}
                  </MenuItem>
                ))}
                {caregivers.map((care, idx) => (
                  <MenuItem
                    key={`care-${idx}`}
                    value={`${care.name} - ${care.category}`}
                  >
                    {care.name} - {care.category}
                  </MenuItem>
                ))}
              </TextField>
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
                onClick={handleCancel}
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
                onClick={handleSave}
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
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Box>
  );
}
