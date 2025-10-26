import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Card,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import { Edit2, Save, Camera, User } from "lucide-react";
// Assuming these components exist in your project structure
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const drawerWidth = 260;

// Custom styling for the decorative card background
const decorativeCardSx = {
  maxWidth: 850,
  mx: "auto",
  borderLeft: "4px solid #77b7ff", // Left border
  borderRight: "4px solid #77b7ff", // Right border
  borderRadius: "0 24px 24px 0",
  boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
  position: "relative",
  overflow: "hidden", // Changed to hidden to contain the custom background
  p: 4,
  background: "#ffffff",
  zIndex: 1, // Ensure content is above the background effect

  // Custom abstract/scattered line background effect
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05, // Subtle opacity
    backgroundImage: `repeating-linear-gradient(
      -45deg,
      #77b7ff 0px,
      #77b7ff 1px,
      transparent 1px,
      transparent 20px
    ), repeating-linear-gradient(
      45deg,
      #0a2f5e 0px,
      #0a2f5e 1px,
      transparent 1px,
      transparent 20px
    )`,
    zIndex: 0,
  },
};

function CustomerSetting() {
  const [editing, setEditing] = useState(false);

  const [admin, setAdmin] = useState({
    name: "Customer",
    email: "customer@demo.com",
    phone: "+91 9876543210",
    address: "123 customer Street, Near Central Park",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    zip: "400001",
    avatar: "", // Placeholder for actual image URL or data
  });

  const [avatarPreview, setAvatarPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setAdmin((prev) => ({ ...prev, avatar: file }));
    }
  };

  const handleSave = () => {
    setEditing(false);
    // In a real application, you'd send 'admin' data to your API here
    console.log("Saving customer Data:", admin);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar email={admin.email} />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "#f4f7f9", // Lighter, modern background
          minHeight: "100vh",
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
          Customer Profile
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

        <Card sx={decorativeCardSx}>
          {/* Edit/Save Button Top Right */}
          <Box
            sx={{
              position: "absolute",
              top: 24,
              right: 24,
              zIndex: 10,
            }}
          >
            {editing ? (
              <Button
                variant="contained"
                size="medium"
                startIcon={<Save size={18} />}
                onClick={handleSave}
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(84,162,217,1) 0%, rgba(44,94,120,1) 100%)",
                  borderRadius: 3,
                  px: 2,
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: 0.5,
                  color: "white",
                  boxShadow:
                    "0 4px 15px rgba(84,162,217,0.4), inset 0 0 6px rgba(255,255,255,0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, rgba(44,94,120,1), rgba(84,162,217,1))",
                    boxShadow: "0 6px 20px rgba(84,162,217,0.5)",
                  },
                }}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="medium"
                startIcon={<Edit2 size={18} />}
                onClick={() => setEditing(true)}
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(84,162,217,1) 0%, rgba(44,94,120,1) 100%)",
                  borderRadius: 3,
                  px: 2,
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: 0.5,
                  color: "white",
                  boxShadow:
                    "0 4px 15px rgba(84,162,217,0.4), inset 0 0 6px rgba(255,255,255,0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, rgba(44,94,120,1), rgba(84,162,217,1))",
                    boxShadow: "0 6px 20px rgba(84,162,217,0.5)",
                  },
                }}
              >
                Edit Profile
              </Button>
            )}
          </Box>

          <Grid container spacing={5} sx={{ position: "relative", zIndex: 1 }}>
            {/* LEFT SECTION: AVATAR (xs=12, md=3) */}
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                textAlign: "center",
                borderRight: { md: "1px solid #e0e0e0" }, // Visual divider
                pr: { md: 2 },
                mb: { xs: 4, md: 0 }, // Extra margin on mobile
              }}
            >
              <Stack alignItems="center" spacing={2}>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={avatarPreview || ""}
                    alt={admin.name}
                    sx={{
                      width: 140, // Slightly larger avatar
                      height: 140,
                      border: "4px solid #77b7ff",
                      boxShadow: "0 0 0 8px #e6f0fa", // Halo effect
                    }}
                  />
                  {editing && (
                    <label htmlFor="avatar-upload">
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleAvatarChange}
                      />
                      <IconButton
                        color="primary"
                        component="span"
                        sx={{
                          bgcolor: "#0a2f5e",
                          color: "#fff",
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          p: 1,
                          borderRadius: "50%",
                          border: "2px solid #fff",
                          "&:hover": { bgcolor: "#1f477e" },
                        }}
                      >
                        <Camera size={20} />
                      </IconButton>
                    </label>
                  )}
                </Box>
                <Typography variant="h6" fontWeight={600} color="#0a2f5e">
                  {admin.name}
                </Typography>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #cce0ff 100%)", // use background instead of bgcolor
                    color: "#000", // black text
                    px: 2.5,
                    py: 0.5,
                    borderRadius: "12px",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // subtle shadow
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <User size={16} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      User
                    </Typography>
                  </Stack>
                </Box>
                <Divider sx={{ width: "80%", display: { md: "none" } }} />
              </Stack>
            </Grid>

            {/* RIGHT SECTION: DETAILS (xs=12, md=9) */}
            <Grid item xs={12} md={9} sx={{ pl: { md: 3 } }}>
              <Stack spacing={3}>
                {/* Page Title */}
                <Typography
                  variant="h6"
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
                  Details
                </Typography>

                {/* Basic Info Row */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Full Name"
                      name="name"
                      value={admin.name}
                      onChange={handleChange}
                      fullWidth
                      disabled={!editing}
                      size="small"
                      sx={{
                        ".MuiInputBase-root": {
                          borderRadius: 2,
                          bgcolor: "#f9fbfd",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: editing ? "#77b7ff" : "#e0e0e0",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email Address"
                      name="email"
                      value={admin.email}
                      onChange={handleChange}
                      fullWidth
                      disabled={!editing}
                      size="small"
                      sx={{
                        ".MuiInputBase-root": {
                          borderRadius: 2,
                          bgcolor: "#f9fbfd",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: editing ? "#77b7ff" : "#e0e0e0",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone Number"
                      name="phone"
                      value={admin.phone}
                      onChange={handleChange}
                      fullWidth
                      disabled={!editing}
                      size="small"
                      sx={{
                        ".MuiInputBase-root": {
                          borderRadius: 2,
                          bgcolor: "#f9fbfd",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: editing ? "#77b7ff" : "#e0e0e0",
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Phone/Address Row */}
                <Grid container spacing={3}>
                  <Grid container spacing={3}>
                    {[
                      { label: "City & State", name: "state" },
                      { label: "ZIP Code", name: "zip" },
                      { label: "Country", name: "country" },
                    ].map((field) => (
                      <Grid item xs={12} sm={4} key={field.name}>
                        <TextField
                          label={field.label}
                          name={field.name}
                          value={admin[field.name]}
                          onChange={handleChange}
                          fullWidth
                          disabled={!editing}
                          size="small"
                          sx={{
                            ".MuiInputBase-root": {
                              borderRadius: 2,
                              bgcolor: "#f9fbfd",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: editing ? "#77b7ff" : "#e0e0e0",
                            },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
              </Stack>

              {/* Save button at the bottom for better UX on large forms */}
              {editing && (
                <Box sx={{ mt: 4, display: { xs: "block", md: "none" } }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Save size={20} />}
                    onClick={handleSave}
                    fullWidth
                    sx={{
                      background:
                        "linear-gradient(135deg, rgba(84,162,217,1) 0%, rgba(44,94,120,1) 100%)",
                      borderRadius: 3,
                      px: 2,
                      py: 1.2,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      letterSpacing: 0.5,
                      color: "white",
                      boxShadow:
                        "0 4px 15px rgba(84,162,217,0.4), inset 0 0 6px rgba(255,255,255,0.3)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, rgba(44,94,120,1), rgba(84,162,217,1))",
                        boxShadow: "0 6px 20px rgba(84,162,217,0.5)",
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
}

export default CustomerSetting;