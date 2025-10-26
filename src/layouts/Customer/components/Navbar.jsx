import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  InputBase,
  alpha,
} from "@mui/material";
import { LogOut, Bell, Search, User } from "lucide-react";

function Navbar({ email }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const firstLetter = email?.charAt(0).toUpperCase() || "A";

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    // Clear session data if any
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #54A2D9, #8B7EAE, #29A0DC)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottomLeftRadius: "16px",
        borderBottomRightRadius: "16px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "#1976d2", // optional background for better look
            padding: "6px 12px",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <User size={24} /> {/* Customer panel icon */}
          </Box>
          Customer Panel
        </Typography>

        {/* Middle - Search Bar */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "12px",
            backgroundColor: alpha("#fff", 0.15),
            "&:hover": { backgroundColor: alpha("#fff", 0.25) },
            width: "40%",
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.5,
          }}
        >
          <Search size={18} style={{ color: "white", marginRight: 8 }} />
          <InputBase
            placeholder="Search…"
            sx={{
              color: "white",
              flex: 1,
              "& input::placeholder": { color: "white", opacity: 0.7 },
            }}
          />
        </Box>

        {/* Right side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Time */}
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "white", letterSpacing: 0.5 }}
          >
            {currentTime.toLocaleTimeString()}
          </Typography>

          {/* Notifications */}
          <IconButton sx={{ color: "white", position: "relative" }}>
            <Badge badgeContent={5} color="error">
              <Bell size={22} />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              p: 0.5,
              borderRadius: "50%",
              border: "2px solid #fff",
              transition: "0.3s",
              "&:hover": { boxShadow: "0 0 12px rgba(84,162,217,0.6)" },
            }}
          >
            <Avatar
              sx={{
                bgcolor: "white",
                color: "#54A2D9",
                fontWeight: "bold",
              }}
            >
              {firstLetter}
            </Avatar>
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 6,
              sx: {
                borderRadius: "16px",
                mt: 1.5,
                minWidth: 220,
                bgcolor: "#f9f9f9",
                overflow: "hidden",
                "& .MuiMenuItem-root": {
                  px: 2,
                  py: 1.5,
                  fontSize: "0.9rem",
                  borderRadius: "8px",
                  transition: "0.2s",
                  "&:hover": {
                    backgroundColor: alpha("#54A2D9", 0.08),
                  },
                },
              },
            }}
          >
            {/* User Info */}
            <Box sx={{ px: 2, py: 2, borderBottom: "1px solid #eee" }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#333" }}
              >
                Hi, Ameen
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "gray" }}
              >
                ameen.pasha@frontial.com
              </Typography>
            </Box>

            {/* Logout */}
            <MenuItem
              onClick={handleLogout}
              sx={{
                color: "#e63946",
                fontWeight: 500,
                mt: 1,
                "&:hover": {
                  backgroundColor: alpha("#e63946", 0.1),
                },
              }}
            >
              <LogOut size={18} style={{ marginRight: 8 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
