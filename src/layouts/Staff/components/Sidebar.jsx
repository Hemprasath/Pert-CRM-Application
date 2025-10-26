import React, { useState, useEffect } from "react"; // useEffect from React
import { useNavigate, useLocation } from "react-router-dom"; // navigation hooks from router
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  LayoutDashboard,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  PlusSquare,
  ShieldCheck,
  FileText,
  Edit3,
  Settings,
} from "lucide-react";

const expandedWidth = 260;
const collapsedWidth = 80;

const menuItems = [
  {
    text: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/Staff/pages/dashboard",
  },
  {
    text: "Appointments",
    icon: <CalendarDays size={20} />,
    path: "/Staff/pages/appointments",
  },
  {
    text: "Pet Records",
    icon: <Clipboard size={20} />,
    path: "/Staff/pages/pet-records",
  },
  {
    text: "Prescriptions",
    icon: <PlusSquare size={20} />,
    path: "/Staff/pages/prescriptions",
  },
  {
    text: "Vaccinations",
    icon: <ShieldCheck size={20} />,
    path: "/Staff/pages/vaccinations",
  },
  {
    text: "History",
    icon: <FileText size={20} />,
    path: "/Staff/pages/history",
  },
  {
    text: "Internal Notes",
    icon: <Edit3 size={20} />,
    path: "/Staff/pages/internal-notes",
  },
  {
    text: "Setting",
    icon: <Settings size={20} />,
    path: "/Staff/pages/staffSetting",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleDrawer = () => setOpen(!open);

  useEffect(() => {
    const currentPath = location.pathname;
    const foundIndex = menuItems.findIndex((item) => item.path === currentPath);
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [location.pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? expandedWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: "width 0.4s ease",
          "& .MuiDrawer-paper": {
            width: open ? expandedWidth : collapsedWidth,
            transition: "width 0.4s ease",
            overflowX: "hidden",
            boxSizing: "border-box",
            background:
              "linear-gradient(180deg, rgba(84,162,217,0.95), rgba(139,126,174,0.95), rgba(41,160,220,0.95))",
            backdropFilter: "blur(14px)",
            borderRight: "none",
            color: "white",
            boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
            position: "fixed", // ✅ Keeps sidebar pinned
            top: 0,
            left: 0,
            height: "100vh", // ✅ Full height of viewport
            overflow: "hidden",
          },
        }}
      >
        {/* Logo */}
        <Toolbar
          sx={{
            minHeight: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "center" : "center",
            transition: "all 0.3s ease",
            fontWeight: "bold",
            fontSize: open ? 20 : 24,
            color: "white",
            letterSpacing: 1,
          }}
        >
          {open ? "🐾 PetCare" : "🐾"}
        </Toolbar>

        {/* Menu */}
        <Box sx={{ px: open ? 2 : 1, mt: 2 }}>
          <List>
            {menuItems.map((item, index) => (
              <Tooltip
                key={item.text}
                title={!open ? item.text : ""}
                placement="right"
                arrow
              >
                <ListItem
                  button
                  onClick={() => {
                    setActiveIndex(index);
                    navigate(item.path);
                  }}
                  sx={{
                    my: 0.5,
                    px: 2,
                    py: 1.5,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: open ? "flex-start" : "center",
                    gap: open ? 2 : 0,
                    transition: "all 0.3s ease",
                    background:
                      activeIndex === index
                        ? "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.2) 100%)"
                        : "transparent",
                    color: activeIndex === index ? "#0A1F44" : "white",
                    fontWeight: activeIndex === index ? 600 : 400,
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                      transform: open ? "translateX(5px)" : "none",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: activeIndex === index ? "#0A1F44" : "white",
                      minWidth: 0,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight:
                              activeIndex === index ? "bold" : "medium",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.text}
                        </Typography>
                      }
                    />
                  )}
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Box>

        {/* Toggle Button */}
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            top: "85%",
            right: -6,
            transform: "translateY(-50%)",
            width: 28,
            height: 36,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(84,162,217,1), rgba(139,126,174,1))",
            color: "white",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.25), 0 0 10px rgba(84,162,217,0.4)",
            border: "1.5px solid rgba(255,255,255,0.4)",
            backdropFilter: "blur(8px)",
            transition: "all 0.35s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: 0, // ✅ tighter inner space

            "&:hover": {
              background:
                "linear-gradient(135deg, rgba(139,126,174,1), rgba(84,162,217,1))",
              transform: "translateY(-50%) scale(1.1)",
              boxShadow:
                "0 6px 14px rgba(0,0,0,0.35), 0 0 16px rgba(84,162,217,0.6)",
            },

            "&:active": {
              transform: "translateY(-50%) scale(0.95)",
              boxShadow:
                "0 3px 8px rgba(0,0,0,0.25), 0 0 8px rgba(84,162,217,0.4)",
            },
          }}
        >
          {open ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </IconButton>
      </Drawer>
    </Box>
  );
}

export default Sidebar;