import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Card,
} from "@mui/material";
import { Search, Filter } from "lucide-react";
import {
  User2,
  Mail,
  Phone,
  PawPrint,
  FileText,
  Trash2,
  Edit3,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const drawerWidth = 260;

// Dummy invoices data
const dummyInvoices = [
  {
    id: 1,
    invoiceNumber: "INV-001",
    customerName: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+91 9876543210",
    address: "123 Blue Street",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    zip: "400001",
    pets: [
      {
        name: "Bella",
        type: "Dog",
        breed: "Golden Retriever",
        gender: "Female",
        age: 5,
      },
      { name: "Milo", type: "Cat", breed: "Persian", gender: "Male", age: 4 },
    ],
    amount: 1200,
    date: "2025-10-10",
    time: "10:00",
    status: "Paid",
  },
  {
    id: 2,
    invoiceNumber: "INV-002",
    customerName: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "+91 9988776655",
    address: "45 Green Avenue",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    zip: "110001",
    pets: [
      { name: "Rocky", type: "Dog", breed: "Labrador", gender: "Male", age: 6 },
    ],
    amount: 900,
    date: "2025-10-12",
    time: "11:30",
    status: "Pending",
  },
  {
    id: 3,
    invoiceNumber: "INV-003",
    customerName: "Priya Desai",
    email: "priya@example.com",
    phone: "+91 9876509876",
    address: "78 Sunset Blvd",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    zip: "560001",
    pets: [
      {
        name: "Luna",
        type: "Rabbit",
        breed: "Mini Lop",
        gender: "Female",
        age: 4,
      },
    ],
    amount: 1500,
    date: "2025-10-14",
    time: "14:00",
    status: "Unpaid",
  },
];

function AdminPaymentsPage() {
  const email = "admin@demo.com";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [invoices, setInvoices] = useState(dummyInvoices);

  // Filtered invoices based on search and status
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.customerName.toLowerCase().includes(search.toLowerCase()) ||
      inv.email.toLowerCase().includes(search.toLowerCase()) ||
      inv.pets.some(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.type.toLowerCase().includes(search.toLowerCase()) ||
          p.breed.toLowerCase().includes(search.toLowerCase())
      );

    const matchesStatus = statusFilter === "All" || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
          Payments & Invoices
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

        {/* Filters & Search */}
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
            placeholder="Search by customer, email, or pet..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              minWidth: "300px",
              maxWidth: "50%",
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
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography fontWeight={600}>Status:</Typography>

            <ToggleButtonGroup
              value={statusFilter}
              exclusive
              onChange={(e, val) => val !== null && setStatusFilter(val)}
              size="small"
              sx={{
                borderRadius: "9999px",
                padding: "4px",
                background: "linear-gradient(145deg, #e0f7ff, #f0faff)", // very light gradient
                boxShadow:
                  "inset 0 3px 6px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
              }}
            >
              {["All", "Paid", "Unpaid", "Pending"].map((val) => {
                let bg, color, shadow;

                if (val === "All") {
                  bg =
                    statusFilter === val
                      ? "linear-gradient(90deg, #a0e6ff, #54c7ff)"
                      : "linear-gradient(145deg, #e0f7ff, #f0faff)";
                  color = statusFilter === val ? "#0a1f44" : "#0A1F44";
                  shadow =
                    statusFilter === val
                      ? "0 3px 6px rgba(84,162,217,0.2)"
                      : "none";
                } else if (val === "Paid") {
                  bg =
                    statusFilter === val
                      ? "linear-gradient(90deg, #b8f1c5, #81e69c)" // soft green gradient when selected
                      : "linear-gradient(145deg, #e6f9ed, #f0fcf5)"; // very light green for unselected
                  color = statusFilter === val ? "#0a1f44" : "#0A1F44";
                  shadow =
                    statusFilter === val
                      ? "0 3px 6px rgba(129,230,156,0.3)" // soft green shadow
                      : "none";
                } else if (val === "Unpaid") {
                  bg =
                    statusFilter === val
                      ? "linear-gradient(90deg, #ffd6d6, #ffb3b3)"
                      : "linear-gradient(145deg, #fef0f0, #ffeaea)";
                  color = statusFilter === val ? "#0a1f44" : "#0A1F44";
                  shadow =
                    statusFilter === val
                      ? "0 3px 6px rgba(244,67,54,0.2)"
                      : "none";
                } else if (val === "Pending") {
                  bg =
                    statusFilter === val
                      ? "linear-gradient(90deg, #fff1b8, #ffe08a)"
                      : "linear-gradient(145deg, #fffaf0, #fff6e0)";
                  color = statusFilter === val ? "#0a1f44" : "#0A1F44";
                  shadow =
                    statusFilter === val
                      ? "0 3px 6px rgba(250,200,80,0.2)"
                      : "none";
                }

                return (
                  <ToggleButton
                    key={val}
                    value={val}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: "9999px",
                      padding: "6px 20px",
                      margin: "2px",
                      background: bg,
                      color: color,
                      boxShadow: shadow,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          statusFilter === val
                            ? bg
                            : "linear-gradient(145deg, #d0f4ff, #e0f7ff)",
                      },
                    }}
                  >
                    {val}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Stack>
        </Box>

        {/* Invoice Table */}
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
            <TableHead sx={{ backgroundColor: "#E0F2FE" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer Details</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Pet Details</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Invoice # / Amount
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Appointment</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInvoices.map((inv) => (
                <TableRow
                  key={inv.id}
                  hover
                  sx={{ "&:hover": { background: "rgba(84,162,217,0.08)" } }}
                >
                  {/* Customer Name */}
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <User2 size={18} />
                      {inv.customerName}
                    </Box>
                  </TableCell>

                  {/* Customer Details */}
                  <TableCell>
                    <Box display="flex" flexDirection="column" gap={0.5}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Mail size={16} />
                        {inv.email}
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Phone size={16} />
                        {inv.phone}
                      </Box>
                      <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                        {inv.address}, {inv.city}, {inv.state}, {inv.country} -{" "}
                        {inv.zip}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Pet Details */}
                  <TableCell>
                    {inv.pets.map((p, i) => (
                      <Chip
                        key={i}
                        label={`${p.name} • ${p.type} • ${p.breed} • ${p.gender} • ${p.age} yrs`}
                        size="small"
                        icon={<PawPrint size={14} />}
                        sx={{
                          mr: 0.5,
                          mb: 0.5,
                          backgroundColor: "#E0F2FE",
                          color: "#0A1F44",
                        }}
                      />
                    ))}
                  </TableCell>

                  {/* Invoice # / Amount */}
                  <TableCell>
                    <Typography fontWeight={600}>
                      {inv.invoiceNumber}
                    </Typography>
                    <Typography variant="body2">₹{inv.amount}</Typography>
                  </TableCell>

                  {/* Appointment */}
                  <TableCell>
                    <Typography>
                      {inv.date} @ {inv.time}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      label={inv.status}
                      size="small"
                      sx={{
                        background:
                          inv.status === "Paid"
                            ? "#4ade80"
                            : inv.status === "Pending"
                            ? "#facc15"
                            : inv.status === "Unpaid"
                            ? "#f87171"
                            : "#3b82f6",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton>
                        <FileText size={18} />
                      </IconButton>
                      <IconButton>
                        <Edit3 size={18} />
                      </IconButton>
                      <IconButton>
                        <Trash2 size={18} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AdminPaymentsPage;
