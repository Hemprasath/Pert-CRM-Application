import React, { useState } from "react";
import {
  Box,
  Typography,
  CssBaseline,
  Toolbar,
  Card,
  Grid,
  Tabs,
  Tab,
  Button,
  Divider,
  Chip, // Added for status/quick info
  Paper, // Using Paper for background elevation
} from "@mui/material";
import {
  Calendar,
  Dog,
  Cat,
  Heart,
  Syringe,
  Clipboard,
  Stethoscope,
  Pill,
  ChevronLeft, // Icon for back button
  Activity,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// Assuming these components exist and are imported correctly
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

const drawerWidth = 260;

// Single unified data for pets with their records (kept the same)
const petsData = [
  {
    id: 1,
    name: "Bella",
    type: "Dog",
    age: "4 years",
    lastVisit: "18 Sep 2025",
    records: {
      prescriptions: [
        {
          medicine: "Amoxicillin 500mg",
          doctor: "Dr. Neha Rao",
          date: "18 Sep 2025",
          dosage: "1 capsule thrice daily",
          notes: "Avoid empty stomach",
        },
        {
          medicine: "Vitamin D 1000 IU",
          doctor: "Dr. John Doe",
          date: "05 Sep 2025",
          dosage: "1 capsule daily",
          notes: "Give after meals",
        },
      ],
      vaccinations: [
        {
          vaccine: "Rabies Vaccine",
          doctor: "Dr. Arjun Verma",
          dateTime: "12 Apr 2024, 10:00 AM",
          nextDue: "12 Apr 2025",
        },
        {
          vaccine: "Distemper",
          doctor: "Dr. Neha Rao",
          dateTime: "15 Feb 2024, 11:30 AM",
          nextDue: "15 Feb 2025",
        },
      ],
      history: [
        {
          condition: "Skin Allergy",
          doctor: "Dr. Meera Sharma",
          diagnosisDate: "10 Jan 2023",
          status: "Ongoing",
          remarks: "Apply ointment weekly",
        },
        {
          condition: "Ear Infection",
          doctor: "Dr. John Doe",
          diagnosisDate: "05 Mar 2022",
          status: "Recovered",
          remarks: "Medication completed",
        },
      ],
    },
  },
  {
    id: 2,
    name: "Coco",
    type: "Cat",
    age: "2 years",
    lastVisit: "10 Jul 2025",
    records: {
      prescriptions: [
        {
          medicine: "FelineVitamin 50mg",
          doctor: "Dr. Arjun Verma",
          date: "05 Jun 2025",
          dosage: "1 tablet daily",
          notes: "With food",
        },
      ],
      vaccinations: [
        {
          vaccine: "Feline Distemper",
          doctor: "Dr. Meera Sharma",
          dateTime: "15 Mar 2024, 11:00 AM",
          nextDue: "15 Mar 2025",
        },
      ],
      history: [
        {
          condition: "Ear Infection",
          doctor: "Dr. Neha Rao",
          diagnosisDate: "20 Feb 2023",
          status: "Recovered",
          remarks: "Medication completed",
        },
      ],
    },
  },
];

// --- Custom Components for Advanced Design ---

const RecordItemCard = ({ item, type }) => {
  let rows = [];
  let title, IconComponent, chipColor, chipLabel;
  let accentColor = "#3b82f6";

  if (type === "prescription") {
    title = item.medicine;
    IconComponent = Pill;
    accentColor = "#ef4444";
    rows = [
      { label: "Doctor", icon: <Stethoscope size={15} />, value: item.doctor },
      { label: "Date", icon: <Calendar size={15} />, value: item.date },
      { label: "Dosage", value: item.dosage },
      { label: "Notes", value: item.notes },
    ];
  } else if (type === "vaccination") {
    title = item.vaccine;
    IconComponent = Syringe;
    accentColor = "#10b981";
    chipColor = "success";
    chipLabel =
      item.nextDue < new Date().toISOString().split("T")[0]
        ? "Overdue"
        : "Due: " + item.nextDue;
    rows = [
      { label: "Doctor", icon: <Stethoscope size={15} />, value: item.doctor },
      {
        label: "Date & Time",
        icon: <Calendar size={15} />,
        value: item.dateTime,
      },
    ];
  } else if (type === "history") {
    title = item.condition;
    IconComponent = Clipboard;
    accentColor = "#f97316";
    chipColor = item.status === "Recovered" ? "success" : "warning";
    chipLabel = item.status;
    rows = [
      { label: "Doctor", icon: <Stethoscope size={15} />, value: item.doctor },
      {
        label: "Diagnosis Date",
        icon: <Calendar size={15} />,
        value: item.diagnosisDate,
      },
      { label: "Remarks", value: item.remarks },
    ];
  }

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(145deg, #ffffff 0%, #f7fbff 100%)",
        border: "1px solid rgba(84,162,217,0.25)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: `linear-gradient(90deg, ${accentColor}, #6EC1E4)`,
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1.5}
      >
        <Box display="flex" alignItems="center" gap={1.2}>
          <Box
            sx={{
              p: 0.8,
              borderRadius: "10px",
              backgroundColor: `${accentColor}1A`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconComponent size={18} color={accentColor} />
          </Box>
          <Typography
            variant="h6"
            fontWeight={700}
            color="#0A1F44"
            sx={{ fontSize: "1rem", letterSpacing: "0.2px" }}
          >
            {title}
          </Typography>
        </Box>

        {(type === "vaccination" || type === "history") && (
          <Chip
            label={chipLabel}
            size="small"
            sx={{
              bgcolor:
                chipColor === "success"
                  ? "rgba(16,185,129,0.1)"
                  : chipColor === "warning"
                  ? "rgba(245,158,11,0.1)"
                  : "rgba(84,162,217,0.1)",
              color:
                chipColor === "success"
                  ? "#059669"
                  : chipColor === "warning"
                  ? "#b45309"
                  : "#2563eb",
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      {/* Compact Info Rows */}
      <Grid container spacing={0.8}>
        {rows.map((r) => (
          <Grid item xs={12} sm={6} key={r.label}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                gap: 0.5, // 🔹 reduced gap between icon, label, and value
                py: 0.4, // 🔹 compact vertical spacing
                px: 0.6,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "rgba(84,162,217,0.05)",
                  transition: "background-color 0.2s",
                },
              }}
            >
              {r.icon && (
                <Box
                  sx={{
                    color: accentColor,
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {r.icon}
                </Box>
              )}
              <Typography
                variant="body2"
                fontWeight={600}
                color="#334257"
                sx={{
                  whiteSpace: "nowrap",
                  mr: 0.5,
                  fontSize: "0.85rem",
                }}
              >
                {r.label}:
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.85rem",
                  lineHeight: 1.4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {r.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

// --- Main Component ---
function CustomerMedicalRecords() {
  const email = "customer@demo.com";
  const [selectedPet, setSelectedPet] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // Consolidated render function using the new RecordItemCard
  const renderRecordsList = (items, type) => (
    <Grid container spacing={4}>
      {items.length === 0 ? (
        <Grid item xs={12}>
          <Paper
            elevation={1}
            sx={{ p: 4, textAlign: "center", borderRadius: 3, bgcolor: "#fff" }}
          >
            <Typography color="text.secondary" variant="h6">
              No {type} records available for {selectedPet.name}.
            </Typography>
          </Paper>
        </Grid>
      ) : (
        items.map((item, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <RecordItemCard item={item} type={type} />
          </Grid>
        ))
      )}
    </Grid>
  );

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
        <Box mb={1}>
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
            Medical Records
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
        </Box>

        {/* ------------------ PET SELECTION VIEW ------------------ */}
        {!selectedPet ? (
          <Grid container spacing={4}>
            {petsData.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <Card
                  onClick={() => setSelectedPet(pet)}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 3,
                    cursor: "pointer",
                    background: "rgba(255, 255, 255, 0.6)", // Soft glass effect
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-6px) scale(1.02)",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                      border: "1px solid #54A2D9",
                    },
                  }}
                >
                  {/* Header: Pet Icon & Type */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    {pet.type === "Dog" ? (
                      <Dog size={40} color="#54A2D9" />
                    ) : (
                      <Cat size={40} color="#54A2D9" />
                    )}
                    <Chip
                      label={pet.type}
                      sx={{
                        bgcolor: "#EBF5FF",
                        color: "#54A2D9",
                        fontWeight: 600,
                      }}
                      size="medium"
                    />
                  </Box>

                  {/* Pet Name */}
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="#0A1F44"
                    mb={1}
                  >
                    {pet.name}
                  </Typography>
                  <Divider sx={{ my: 1, width: "50%" }} />

                  {/* Pet Details with Icons */}
                  <Box display="flex" flexDirection="column" gap={1.2} mt={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Activity size={16} color="#54A2D9" />
                      <Typography variant="body2" color="text.secondary">
                        <Box component="span" fontWeight={600} mr={0.5}>
                          Age:
                        </Box>
                        {pet.age}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Pill size={16} color="#54A2D9" />
                      <Typography variant="body2" color="text.secondary">
                        <Box component="span" fontWeight={600} mr={0.5}>
                          Weight:
                        </Box>
                        {pet.weight || "N/A"}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Clipboard size={16} color="#54A2D9" />
                      <Typography variant="body2" color="text.secondary">
                        <Box component="span" fontWeight={600} mr={0.5}>
                          Sex:
                        </Box>
                        {pet.sex || "N/A"}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Calendar size={16} color="#54A2D9" />
                      <Typography variant="body2" color="text.secondary">
                        <Box component="span" fontWeight={600} mr={0.5}>
                          Last Visit:
                        </Box>
                        {pet.lastVisit}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* ------------------ RECORDS DETAIL VIEW ------------------ */
          <>
            <Button
              onClick={() => setSelectedPet(null)}
              startIcon={<ChevronLeft size={20} />}
              sx={{
                mb: 4,
                px: 3, // horizontal padding
                py: 1.5, // vertical padding
                borderRadius: "50px", // pill shape
                fontWeight: 700,
                fontSize: 16,
                color: "#fff",
                textTransform: "none",
                background: "linear-gradient(90deg, #54A2D9, #8B7EAE)",
                boxShadow: "0 6px 20px rgba(84,162,217,0.4)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  background: "linear-gradient(90deg, #8B7EAE, #54A2D9)",
                  transform: "translateY(-2px) scale(1.02)",
                  boxShadow: "0 10px 25px rgba(84,162,217,0.5)",
                },
                "& .MuiButton-startIcon": {
                  color: "#fff",
                },
              }}
            >
              Back to Pet Selection
            </Button>

            {/* Pet Detail Header Card */}
            <Card
              sx={{
                p: 3, // reduced padding
                mb: 4,
                borderRadius: 4, // slightly smaller corners
                bgcolor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 3, // reduced gap
                transition: "all 0.3s ease-in-out",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "linear-gradient(120deg, #54A2D9, #8B7EAE, #54A2D9)",
                  opacity: 0.05,
                  transform: "rotate(25deg)",
                },
                "&:hover": {
                  boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {/* Pet Icon */}
              {selectedPet.type === "Dog" ? (
                <Dog size={50} color="#54A2D9" /> // smaller icon
              ) : (
                <Cat size={50} color="#54A2D9" />
              )}

              {/* Pet Name & Health Records */}
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  variant="h3" // smaller headline
                  fontWeight={900}
                  sx={{
                    background: "linear-gradient(90deg, #0A1F44, #54A2D9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: 0.8,
                    mb: 0.5,
                    lineHeight: 1.2,
                  }}
                >
                  {selectedPet.name}
                </Typography>
                <Typography
                  variant="h6" // smaller subtitle
                  fontWeight={500}
                  color="rgba(0,0,0,0.7)"
                  sx={{ letterSpacing: 0.4 }}
                >
                  Health Records
                </Typography>
              </Box>
            </Card>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                mb: 4,
                bgcolor: "rgba(255,255,255,0.15)", // soft glass background
                backdropFilter: "blur(15px)",
                borderRadius: 3,
                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                minHeight: 50,
                px: 1,
                "& .MuiTabs-flexContainer": {
                  justifyContent: "space-around",
                  gap: 1,
                },
                "& .MuiTab-root": {
                  fontWeight: 700,
                  fontSize: 15,
                  minHeight: 45,
                  color: "#334257",
                  textTransform: "none",
                  borderRadius: 3,
                  transition: "all 0.3s ease-in-out",
                  "&.Mui-selected": {
                    background: "linear-gradient(90deg, #54A2D9, #8B7EAE)",
                    color: "#fff",
                    boxShadow: "0 6px 20px rgba(84,162,217,0.4)",
                  },
                  "&:hover": {
                    background: "rgba(84,162,217,0.1)",
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                },
                "& .MuiTabs-indicator": {
                  display: "none", // remove default indicator
                },
              }}
            >
              <Tab
                label="Prescriptions"
                icon={<Pill size={18} />}
                iconPosition="start"
              />
              <Tab
                label="Vaccinations"
                icon={<Syringe size={18} />}
                iconPosition="start"
              />
              <Tab
                label="History"
                icon={<Heart size={18} />}
                iconPosition="start"
              />
            </Tabs>

            {/* Record Content based on Tab */}
            {tabValue === 0 &&
              renderRecordsList(
                selectedPet.records.prescriptions,
                "prescription"
              )}
            {tabValue === 1 &&
              renderRecordsList(
                selectedPet.records.vaccinations,
                "vaccination"
              )}
            {tabValue === 2 &&
              renderRecordsList(selectedPet.records.history, "history")}
          </>
        )}
      </Box>
    </Box>
  );
}

export default CustomerMedicalRecords;
