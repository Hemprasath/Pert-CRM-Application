import React, { useState } from "react";

import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
  Dialog,
  Modal,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Tooltip,
  Divider,
  IconButton,
  Avatar,
  InputAdornment,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import {
  Eye,
  Filter,
  Plus,
  Dog,
  Cat,
  Bird,
  Fish,
  Rabbit,
  PawPrint,
  User,
  Mars,
  Venus,
  Calendar,
  Users,
  Clipboard,
  Clock,
  Edit3,
  Trash2,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import charlieImg from "../assets/images/petDog.jpeg";
import mistyImg from "../assets/images/cat.jpeg";
import buddyImg from "../assets/images/DOg.png";

const drawerWidth = 260;

function CustomerDashboard() {
  const email = "customer@demo.com";
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleClose = () => setSelectedPet(null);

  const [appointments, setAppointments] = useState([
    {
      id: "1",
      petName: "Charlie",
      service: "Vaccination",
      date: "2025-10-15",
      time: "10:00",
      ampm: "AM",
      doctor: "Dr. Smith",
      notes: "Annual booster shot",
    },
    {
      id: "2",
      petName: "Misty",
      service: "Dental Cleaning",
      date: "2025-10-17",
      time: "14:30",
      ampm: "PM",
      doctor: "Dr. Brown",
      notes: "Tartar removal",
    },
    {
      id: "3",
      petName: "Buddy",
      service: "Nail Trimming",
      date: "2025-10-20",
      time: "09:00",
      ampm: "AM",
      doctor: "Dr. Lee",
      notes: "Quick trim",
    },
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Vaccination Completed",
      message: "Charlie received his annual booster shot.",
      type: "success", // success, info, warning, error
      time: "2 hours ago",
    },
    {
      id: "2",
      title: "Appointment Reminder",
      message: "Misty has a dental cleaning scheduled tomorrow at 2:30 PM.",
      type: "info",
      time: "1 day ago",
    },
    {
      id: "3",
      title: "Nail Trimming Alert",
      message: "Buddy's nail trimming was completed successfully.",
      type: "success",
      time: "3 days ago",
    },
  ]);

  const typeColors = {
    success: "#4CAF50",
    info: "#2196F3",
    warning: "#FF9800",
    error: "#F44336",
  };

  const [editingAppointment, setEditingAppointment] = useState(null);
  const [openApptDialog, setOpenApptDialog] = useState(false);

  const [apptForm, setApptForm] = useState({
    petName: "",
    service: "",
    date: "",
    time: "",
    ampm: "AM",
    doctor: "",
    notes: "",
  });

  const [pets, setPets] = useState([
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
    },
    {
      name: "Buddy",
      type: "Rabbit",
      breed: "Mini Lop",
      gender: "Male",
      dob: "2022-08-01",
      age: 1,
      color: "Brown",
      weight: 2.5,
      bloodGroup: "N/A",
      microchipNumber: "RAB123456",
      allergies: "None",
      foodPreferences: "Carrots, Lettuce",
      behaviourNotes: "Playful and curious",
      profileImage: buddyImg,
      suggestedNotes: "Needs large cage and toys",
    },
  ]);

  const handleEdit = (index) => {
    const petToEdit = pets[index]; // your pets array
    setNewPet({ ...petToEdit }); // prefill the form
    setEditingIndex(index); // save the index
    setOpenDialog(true); // open dialog
  };

  const handleDelete = (index) => {
    console.log("Delete pet:", pets[index].name);
  };

  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
    file: null,
  });

  const [editingIndex, setEditingIndex] = useState(null); // track which pet is being edited

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPet({
      name: "",
      type: "",
      breed: "",
      age: "",
      gender: "",
      file: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setNewPet((prev) => ({ ...prev, file: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      // Update existing pet
      const updatedPets = [...pets];
      updatedPets[editingIndex] = { ...newPet };
      setPets(updatedPets);
    } else {
      // Add new pet
      setPets((prev) => [...prev, newPet]);
    }

    // Reset
    setNewPet({
      name: "",
      type: "",
      breed: "",
      age: "",
      gender: "",
      file: null,
    });
    setEditingIndex(null);
    setOpenDialog(false);
  };

  const handleOpenAppt = () => {
    setEditingAppointment(null);
    setApptForm({
      petName: "",
      service: "",
      date: "",
      time: "",
      ampm: "AM",
      doctor: "",
      notes: "",
    });
    setOpenApptDialog(true);
  };

  const handleEditAppt = (appt) => {
    setEditingAppointment(appt);
    setApptForm(appt);
    setOpenApptDialog(true);
  };

  const handleDeleteAppt = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleApptChange = (e) => {
    const { name, value } = e.target;
    setApptForm({ ...apptForm, [name]: value });
  };

  const handleSaveAppt = () => {
    if (!apptForm.petName || !apptForm.date || !apptForm.time) {
      alert("Please fill required fields");
      return;
    }

    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === editingAppointment.id ? apptForm : a))
      );
    } else {
      setAppointments((prev) => [
        ...prev,
        { ...apptForm, id: Date.now().toString() },
      ]);
    }

    setOpenApptDialog(false);
  };

  const getPetIcon = (type) => {
    const t = (type || "").toLowerCase();
    if (t.includes("dog")) return <Dog size={22} color="#1976D2" />;
    if (t.includes("cat")) return <Cat size={22} color="#1976D2" />;
    if (t.includes("bird")) return <Bird size={22} color="#1976D2" />;
    if (t.includes("fish")) return <Fish size={22} color="#1976D2" />;
    if (t.includes("rabbit")) return <Rabbit size={22} color="#1976D2" />;
    return <PawPrint size={22} color="#1976D2" />;
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
        }}
      >
        <Toolbar />

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
          Dashboard Overview
          {/* Decorative Gradient Underline */}
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
          />
        </Typography>

        <Box
          sx={{
            position: "relative",
            p: 5,
            borderRadius: "40px 40px 0 0",
            background: "linear-gradient(90deg, #ffffff, #cce7ff) border-box",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 12px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255,255,255,0.2) inset",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            overflow: "hidden",
            mb: 5,
            transition: "all 0.3s ease-in-out",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)",
              transform: "rotate(45deg)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-30%",
              right: "-30%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 70%)",
              borderRadius: "50%",
            },
          }}
        >
          {/* Card Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #4dabf7, #2196f3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.4rem", md: "1.7rem" }, // slightly larger
                textShadow: "0 2px 6px rgba(33, 150, 243, 0.3)",
              }}
            >
              My Pets
            </Typography>
          </Box>
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
              placeholder="Search by pet details..."
              size="small"
              sx={{
                flex: 1,
                minWidth: "280px",
                maxWidth: "400px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                "& .MuiOutlinedInput-root": {
                  paddingRight: "8px",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "1px solid rgba(255,255,255,0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #54A2D9",
                  },
                },
                "& .MuiInputAdornment-root svg": {
                  color: "#54A2D9",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton sx={{ p: 0 }}>
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="contained"
                  startIcon={<Plus size={16} />}
                  onClick={handleOpenDialog}
                  sx={{
                    background:
                      "linear-gradient(135deg, rgba(84,162,217,1) 0%, rgba(44,94,120,1) 100%)",
                    borderRadius: 0,
                    px: 2.5, // reduced horizontal padding
                    py: 0.8, // reduced vertical padding
                    fontWeight: 600,
                    fontSize: "0.85rem", // smaller font
                    letterSpacing: 0.4,
                    boxShadow:
                      "0 3px 10px rgba(84,162,217,0.35), inset 0 0 4px rgba(255,255,255,0.25)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, rgba(44,94,120,1), rgba(84,162,217,1))",
                      boxShadow: "0 5px 15px rgba(84,162,217,0.45)",
                    },
                  }}
                >
                  Add Pet
                </Button>
              </motion.div>
            </Stack>
          </Box>

          <Grid container spacing={3}>
            {pets.map((pet, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    p: 2,
                    borderRadius: 4,
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.35), rgba(255,255,255,0.1))",
                    backdropFilter: "blur(18px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    boxShadow:
                      "0 8px 25px rgba(84,162,217,0.15), 0 2px 10px rgba(0,0,0,0.05)",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow:
                        "0 12px 30px rgba(84,162,217,0.25), 0 4px 15px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {/* Action Buttons */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => console.log("Edit", index)}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.75)",
                          "&:hover": { bgcolor: "#E3F2FD" },
                          transition: "all 0.3s",
                        }}
                      >
                        <Edit3 size={18} color="#0A1F44" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => console.log("Delete", index)}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.75)",
                          "&:hover": { bgcolor: "#FFEBEE" },
                          transition: "all 0.3s",
                        }}
                      >
                        <Trash2 size={18} color="#D32F2F" />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Pet Image */}
                  <Box
                    component="img"
                    src={pet.profileImage} // corrected from pet.file
                    alt={pet.name}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 3,
                      mb: 2,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                      transition: "all 0.3s",
                    }}
                  />

                  {/* Name + Icon */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    mb={1}
                  >
                    {getPetIcon(pet.type)}
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="#0A1F44"
                      sx={{ letterSpacing: 0.5 }}
                    >
                      {pet.name}
                    </Typography>
                  </Box>

                  <Divider
                    sx={{
                      width: "75%",
                      mx: "auto",
                      my: 1,
                      borderColor: "rgba(84,162,217,0.2)",
                    }}
                  />

                  {/* Essential Info - Modern Card Style */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.5,
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    {/* Type */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        bgcolor: "rgba(84,162,217,0.1)",
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      {getPetIcon(pet.type)}
                      <Box>
                        <Typography
                          variant="caption"
                          color="#555"
                          display="block"
                        >
                          Type
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {pet.type}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Breed */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        bgcolor: "rgba(41,160,220,0.1)",
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <User size={20} color="#1976D2" />
                      <Box>
                        <Typography
                          variant="caption"
                          color="#555"
                          display="block"
                        >
                          Breed
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {pet.breed}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Age */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        bgcolor: "rgba(255,110,199,0.1)",
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Calendar size={20} color="#FF6EC7" />
                      <Box>
                        <Typography
                          variant="caption"
                          color="#555"
                          display="block"
                        >
                          Age
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {pet.age} yrs
                        </Typography>
                      </Box>
                    </Box>

                    {/* Gender */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        bgcolor:
                          pet.gender.toLowerCase() === "male"
                            ? "rgba(84,162,217,0.1)"
                            : "rgba(255,110,199,0.1)",
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      {pet.gender.toLowerCase() === "male" ? (
                        <Mars size={20} color="#54A2D9" />
                      ) : (
                        <Venus size={20} color="#FF6EC7" />
                      )}
                      <Box>
                        <Typography
                          variant="caption"
                          color="#555"
                          display="block"
                        >
                          Gender
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {pet.gender}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>




                  {/* View Details Button */}
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setSelectedPet(pet)}
                      startIcon={<Eye size={16} />}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        bgcolor: "rgba(41,160,220,0.85)",
                        color: "#fff",
                        borderRadius: 3,
                        px: 2,
                        py: 0.7,
                        boxShadow: "0 4px 15px rgba(41,160,220,0.3)",
                        transition: "all 0.3s",
                        "&:hover": {
                          bgcolor: "rgba(41,160,220,1)",
                          boxShadow: "0 6px 20px rgba(41,160,220,0.4)",
                        },
                      }}
                    >
                      View Profile
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>


          <Modal open={!!selectedPet} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: 600, md: 700 },
                bgcolor: "#fff",
                borderRadius: 3,
                p: 3,
                boxShadow: 5,
                overflowY: "auto",
                maxHeight: "90vh",
              }}
            >
              {selectedPet && (
                <>
                  {/* Header: Pet name top-left */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: "#1e88e5" }}
                    >
                      🐾 {selectedPet.name}
                    </Typography>
                  </Box>

                  {/* Image */}
                  <Box
                    component="img"
                    src={selectedPet.profileImage}
                    alt={selectedPet.name}
                    sx={{
                      width: { xs: "90%", sm: 300, md: 350 }, 
                      height: { xs: "auto", sm: 250, md: 300 },
                      borderRadius: 3,
                      objectFit: "cover",
                      mb: 3,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      mx: "auto", 
                    }}
                  />


                  {/* Info */}
                  <Box
                    sx={{
                      display: "grid",
                      gap: 1.5,
                      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    }}
                  >
                    {Object.entries(selectedPet).map(([key, value]) => {
                      if (["profileImage", "name"].includes(key)) return null;
                      return (
                        <Box
                          key={key}
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: "#f5f7fa",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: "#1e88e5",
                              fontWeight: 600,
                              textTransform: "capitalize",
                              mb: 0.3,
                            }}
                          >
                            {key.replace(/([A-Z])/g, " $1")}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#222", fontWeight: 500 }}
                          >
                            {value || "—"}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>

                  {/* Close Button bottom-right */}
                  <Box display="flex" justifyContent="flex-end" mt={4}>
                    <Button
                      variant="contained"
                      onClick={handleClose}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 3,
                        px: 5,
                        py: 1.1,
                        fontSize: "1rem",
                        bgcolor: "#1e88e5",
                        boxShadow: "0 4px 10px rgba(30,136,229,0.3)",
                        "&:hover": {
                          bgcolor: "#1565c0",
                          boxShadow: "0 6px 16px rgba(30,136,229,0.4)",
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



        {/* Appointments */}
        <Card
          sx={{
            p: 4,
            borderRadius: "0 0 40px 40px",
            background: "linear-gradient(90deg,#ffffff) border-box",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 12px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255,255,255,0.2) inset",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            mb: 5,
          }}
        >
          {/* Header and Add Button */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #4dabf7, #2196f3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.4rem", md: "1.7rem" }, // slightly larger
                textShadow: "0 2px 6px rgba(33, 150, 243, 0.3)",
              }}
            >
              Upcoming Appointments
            </Typography>
          </Box>

          {/* Appointments Grid */}
          <Grid container spacing={3}>
            {appointments.length === 0 ? (
              <Typography color="text.secondary" sx={{ ml: 2 }}>
                No appointments yet.
              </Typography>
            ) : (
              appointments.map((a) => (
                <Grid item xs={12} sm={6} md={4} key={a.id}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      p: 3,
                      background:
                        "linear-gradient(135deg, #E0F3FF 0%, #F9FBFF 100%)",
                      boxShadow:
                        "0 4px 6px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px) scale(1.02)",
                        boxShadow:
                          "0 10px 20px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <CardContent>
                      {/* Header: Pet Name + Actions */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color="#054F77"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {a.petName}
                        </Typography>
                        <Box display="flex" gap={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleEditAppt(a)}
                            sx={{
                              bgcolor: "#D4EDFF",
                              "&:hover": { bgcolor: "#A7D8FF" },
                              border: "1px solid #54A2D9",
                            }}
                          >
                            <Edit3 size={16} color="#054F77" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteAppt(a.id)}
                            sx={{
                              bgcolor: "#FFD6D6",
                              "&:hover": { bgcolor: "#FFB6B6" },
                              border: "1px solid #FF4D4D",
                            }}
                          >
                            <Trash2 size={16} color="#C70000" />
                          </IconButton>
                        </Box>
                      </Box>

                      <Divider sx={{ mb: 2, borderColor: "#BBDDF9" }} />

                      {/* Appointment Details */}
                      <Box display="flex" flexDirection="column" gap={1.5}>
                        {[
                          {
                            icon: <Clipboard size={16} color="#54A2D9" />,
                            label: "Service",
                            value: a.service,
                          },
                          {
                            icon: <Calendar size={16} color="#54A2D9" />,
                            label: "Date",
                            value: a.date,
                          },
                          {
                            icon: <Clock size={16} color="#54A2D9" />,
                            label: "Time",
                            value: `${a.time} ${a.ampm}`,
                          },
                          {
                            icon: <Users size={16} color="#54A2D9" />,
                            label: "Doctor",
                            value: a.doctor,
                          },
                        ].map((item, index) => (
                          <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            gap={1}
                          >
                            {item.icon}
                            <Typography variant="body2" color="#054F77">
                              <strong>{item.label}:</strong> {item.value}
                            </Typography>
                          </Box>
                        ))}
                        {a.notes && (
                          <Typography
                            variant="body2"
                            color="#054F77"
                            sx={{ mt: 0.5, opacity: 0.85 }}
                          >
                            <strong>Notes:</strong> {a.notes}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Card>

        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, #F9FBFF 0%, #E0F3FF 100%)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.4rem", md: "1.7rem" },
                background: "linear-gradient(90deg, #4dabf7, #2196f3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 6px rgba(33, 150, 243, 0.3)",
              }}
            >
              Latest Notifications
            </Typography>
          </Box>

          {/* Notifications List */}
          <Stack spacing={2}>
            {notifications.length === 0 ? (
              <Typography color="text.secondary">
                No notifications yet.
              </Typography>
            ) : (
              notifications.map((n) => (
                <Card
                  key={n.id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    p: 2.5,
                    borderRadius: 3,
                    background: "#fff",
                    borderLeft: `6px solid ${typeColors[n.type]}`,
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow:
                        "0 4px 12px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: typeColors[n.type],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {n.type === "success" && "✔"}
                    {n.type === "info" && "ℹ"}
                    {n.type === "warning" && "⚠"}
                    {n.type === "error" && "✖"}
                  </Box>

                  {/* Content */}
                  <Box flex={1}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      color="#054F77"
                      sx={{ mb: 0.3 }}
                    >
                      {n.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#054F77"
                      sx={{ opacity: 0.85 }}
                    >
                      {n.message}
                    </Typography>
                  </Box>

                  {/* Time */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ whiteSpace: "nowrap", ml: 1 }}
                  >
                    {n.time}
                  </Typography>
                </Card>
              ))
            )}
          </Stack>
        </Card>

        {/* Pet Dialog */}
        {/* Pet Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
            },
          }}
        >
          {/* Dialog Header */}
          <Box
            sx={{
              px: 3,
              py: 2,
              background: "linear-gradient(90deg, #39517cff, #4da3e1ff)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            {editingIndex !== null ? "Edit Pet" : "Add Pet"}
          </Box>

          {/* Dialog Content */}
          <DialogContent
            sx={{
              background: "linear-gradient(135deg, #ffffff 80%, #f0f4f8 20%)",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              pt: 3,
              pb: 2,
            }}
          >
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={newPet.name}
              onChange={handleChange}
            />

            <TextField
              select
              label="Type"
              name="type"
              fullWidth
              variant="outlined"
              value={newPet.type}
              onChange={handleChange}
            >
              {["Dog", "Cat", "Bird", "Fish", "Rabbit"].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Breed"
              name="breed"
              fullWidth
              variant="outlined"
              value={newPet.breed}
              onChange={handleChange}
            />

            <TextField
              label="Age"
              name="age"
              fullWidth
              variant="outlined"
              value={newPet.age}
              onChange={handleChange}
            />

            <TextField
              select
              label="Gender"
              name="gender"
              fullWidth
              variant="outlined"
              value={newPet.gender}
              onChange={handleChange}
            >
              {["Male", "Female"].map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </TextField>

            {/* Upload Image */}
            <Box
              sx={{
                gridColumn: "1 / -1",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mt: 1,
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  background: "linear-gradient(135deg, #4da3e1, #39517c)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #39517c, #4da3e1)",
                  },
                }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {newPet.file && typeof newPet.file === "string" && (
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: 250,
                    borderRadius: 2,
                    overflow: "hidden",
                    mt: 1,
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <img
                    src={newPet.file}
                    alt="Pet"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </Box>
              )}
            </Box>
          </DialogContent>

          {/* Dialog Actions / Footer */}
          <DialogActions
            sx={{
              background: "linear-gradient(135deg, #ffffff 80%, #f0f4f8 20%)",
              px: 3,
              py: 2,
            }}
          >
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{
                borderColor: "#ccc",
                color: "#0A1F44",
                "&:hover": { borderColor: "#888" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #39517c, #4da3e1)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4da3e1, #39517c)",
                },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default CustomerDashboard;
