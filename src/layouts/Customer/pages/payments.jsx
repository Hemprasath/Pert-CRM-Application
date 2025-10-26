import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Card,
  Grid,
  Typography,
  Button,
  Divider,
  Chip,
  Dialog,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Calendar, Download, Eye, FileText, Clock, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { jsPDF } from "jspdf";

const drawerWidth = 260;

const CustomerPayments = () => {
  const email = "customer@demo.com";
  const [openDialog, setOpenDialog] = useState(null); // store index of open invoice

  const invoice = [
    {
      id: "3018",
      paymentDoneDate: "Dec 1st 2025",
      CustomerName: "Digvesh",
      address: "somewhere",
      zipCode: "600001",
      petName: "Buddy",
      petType:  "Dog",
      petBreed:"Pom",
      petAge: "2",
      service: "Grooming",
      paymentMethod: "UPI",
      email: "digves@gmail.com",
      phone: 1234567890,
      items: [
        { name: "Veterinary", price: 400.0 },
        { name: "Grooming", price: 1500.0 },
      ],
      status: "Paid",
    },
    {
      id: "3019",
      paymentDoneDate: "Dec 2nd 2025",
      CustomerName: "Riya",
      address: "elsewhere",
      zipCode: "600002",
      petName: "Charlie",
      petType:  "Dog",
      petBreed:"Pom",
      petAge: "2",
      service: "Vaccination",
      paymentMethod: "Cash",
       email: "riya@gmail.com",
      phone: 1234567890,
      items: [
        { name: "Vaccination", price: 500.0 },
        { name: "Checkup", price: 300.0 },
      ],
      status: "Pending",
    },
    {
      id: "3019",
      paymentDoneDate: "Dec 2nd 2025",
      CustomerName: "Kumar",
      address: "elsewhere",
      zipCode: "600001",
      petName: "Snowie",
      petType:  "Dog",
      petBreed:"Pom",
      petAge: "2",
      service: "Grooming",
      paymentMethod: "Cash",
       email: "kumar@gmail.com",
      phone: 1234567890,
      items: [
        { name: "Vaccination", price: 500.0 },
        { name: "Checkup", price: 300.0 },
      ],
      status: "Paid",
    },
    // Add more invoice here
  ];

  const handleView = (index) => setOpenDialog(index);
  const handleClose = () => setOpenDialog(null);

  const handleDownload = (invoice) => {
  try {
    const doc = new jsPDF();
    // ---------- CONSTANTS ----------
    const pageWidth = 210; // A4 width in mm
    const margin = 20;
    const tableWidth = pageWidth - margin * 2;
    const colItemX = margin + 2;
    const colAmountX = pageWidth - margin - 10;
    const lineHeight = 8;
    let y = 30;
    // ---------- FIXED DATA KEYS ----------
    const CustomerName = invoice.CustomerName ||  "";
    const address = invoice.address || "";
    const zip = invoice.zipCode || "";
    const email = invoice.email || "";
    const phone = invoice.phone || "";
    //  Added these missing fields
    const petName = invoice.petName || "";
    const petType = invoice.petType || "";
    const petBreed = invoice.petBreed || "";
    const petAge = invoice.petAge || "";
    const service = invoice.service || "";
    const paymentMethod = invoice.paymentMethod || "";

    const totalAmount = Array.isArray(invoice.items)
      ? invoice.items.reduce((sum, item) => sum + parseFloat(item.price), 0)
      : 0;

    const paymentTime =
      invoice.time ||
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    // ---------- HEADER ----------
    doc.setFillColor(44, 94, 120);
    doc.rect(0, 0, pageWidth, 25, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(255, 255, 255);
    doc.text(`Invoice #${invoice.id}`, pageWidth / 2, 17, { align: "center" });
    // ---------- DATE & TIME ----------
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(`Date: ${invoice.paymentDoneDate}`, pageWidth - margin, 8, {
      align: "right",
    });
    doc.text(`Time: ${paymentTime}`, pageWidth - margin, 16, {
      align: "right",
    });
    // ---------- CUSTOMER & PET BOXES ----------
    const leftX = margin;
    const rightX = margin + tableWidth / 2 + 5;
    const boxWidth = tableWidth / 2 - 5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(44, 94, 120);
    // ---- CUSTOMER DETAILS ----
    let yCustomer = y + 8;
    doc.setFillColor(235, 245, 255);
    doc.setDrawColor(44, 94, 120);
    doc.rect(leftX, y, boxWidth, 0, "F");
    doc.text("Customer Details", leftX + 3, yCustomer);
    yCustomer += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0);
    [
      `Name: ${CustomerName}`,
      `Address: ${address}`,
      `Zip Code: ${zip}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
    ].forEach((line) => {
      const split = doc.splitTextToSize(line, boxWidth - 8);
      doc.text(split, leftX + 3, yCustomer);
      yCustomer += split.length * 5 + 2;
    });
    const customerBoxHeight = yCustomer - y + 4;

    // ---- PET DETAILS ----
    let yPet = y + 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(44, 94, 120);
    doc.setFillColor(235, 245, 255);
    doc.setDrawColor(44, 94, 120);
    doc.rect(rightX, y, boxWidth, 0, "F");
    doc.text("Pet Details", rightX + 3, yPet);
    yPet += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0);
    [
      `Pet Name: ${petName}`,
      `Type: ${petType}`,
      `Breed: ${petBreed}`,
      `Age: ${petAge}`,
      `Service: ${service}`,
      `Payment: ${paymentMethod}`,
    ].forEach((line) => {
      const split = doc.splitTextToSize(line, boxWidth - 8);
      doc.text(split, rightX + 3, yPet);
      yPet += split.length * 5 + 2;
    });
    const petBoxHeight = yPet - y + 4;

    const finalHeight = Math.max(customerBoxHeight, petBoxHeight);
    doc.setDrawColor(44, 94, 120);
    doc.setFillColor(235, 245, 255);
    doc.rect(leftX, y, boxWidth, finalHeight, "FD");
    doc.rect(rightX, y, boxWidth, finalHeight, "FD");

    // redraw text
    let textY = y + 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(44, 94, 120);
    doc.text("Customer Details", leftX + 3, textY);
    doc.text("Pet Details", rightX + 3, textY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0);
    textY += 7;
    [
      `Name: ${CustomerName}`,
      `Address: ${address}`,
      `Zip Code: ${zip}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
    ].forEach((line) => {
      const split = doc.splitTextToSize(line, boxWidth - 8);
      doc.text(split, leftX + 3, textY);
      textY += split.length * 5 + 2;
    });

    let textY2 = y + 15;
    [
      `Pet Name: ${petName}`,
      `Type: ${petType}`,
      `Breed: ${petBreed}`,
      `Age: ${petAge}`,
      `Service: ${service}`,
      `Payment: ${paymentMethod}`,
    ].forEach((line) => {
      const split = doc.splitTextToSize(line, boxWidth - 8);
      doc.text(split, rightX + 3, textY2);
      textY2 += split.length * 5 + 2;
    });

    y += finalHeight + 15;

    // ---------- ITEMS TABLE ----------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(84, 162, 217);
    doc.rect(margin, y, tableWidth, lineHeight, "F");
    doc.text("Item", colItemX, y + 6);
    doc.text("Amount (RS)", colAmountX, y + 6, { align: "right" });

    y += lineHeight;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    Array.isArray(invoice.items) &&
      invoice.items.forEach((item, idx) => {
        doc.setFillColor(idx % 2 === 0 ? 245 : 255, 245, 245);
        doc.rect(margin, y, tableWidth, lineHeight, "F");
        const maxItemLength = 35;
        const itemName =
          item.name.length > maxItemLength
            ? item.name.slice(0, maxItemLength - 3) + "..."
            : item.name;
        doc.setTextColor(0);
        doc.text(itemName, colItemX, y + 6);
        const amountText = `RS ${parseFloat(item.price).toFixed(2)}`;
        doc.text(amountText, colAmountX, y + 6, { align: "right" });
        y += lineHeight;
      });

    // ---------- TOTAL ----------
    doc.setFillColor(44, 94, 120);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.rect(margin, y, tableWidth, lineHeight, "F");
    doc.text("Total", colItemX, y + 6);
    doc.text(`RS ${totalAmount.toFixed(2)}`, colAmountX, y + 6, {
      align: "right",
    });

    y += lineHeight + 10;

    // ---------- STATUS ----------
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    const statusColor =
      invoice.status === "Paid"
        ? [74, 222, 128]
        : [250, 204, 21];
    doc.setFillColor(...statusColor);
    doc.rect(margin, y, 30, lineHeight, "F");
    doc.text(invoice.status, margin + 15, y + 6, { align: "center" });

    // ---------- SAVE ----------
    doc.save(`Invoice_${invoice.id}.pdf`);
  } catch (err) {
    console.error("PDF generation error:", err);
  }
};
  const paymentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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
            Payments
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

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {invoice.map((inv, index) => {
              const totalAmount = Array.isArray(inv.items)
                ? inv.items.reduce(
                    (sum, item) => sum + parseFloat(item.price),
                    0
                  )
                : 0;

              return (
                <Card
                  key={index}
                  sx={{
                    width: { xs: "100%", sm: "28%" },
                    minWidth: 220,
                    borderRadius: 3,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  {/* HEADER */}
                  <Box
                    sx={{
                      background:
                        "linear-gradient(135deg, rgba(44,94,120,1), rgba(84,162,217,1))",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 2,
                      py: 1.5,
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      gap: 1,
                    }}
                  >
                    <FileText size={20} />
                    <Typography variant="subtitle2" fontWeight={700}>
                      INVOICE : {inv.id}
                    </Typography>
                  </Box>

                  {/* BODY */}
                  <Box sx={{ p: 2, flex: 1 }}>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" display="block">
                        <strong>Date:</strong> {inv.paymentDoneDate}
                      </Typography>
                      <Typography variant="caption" display="block">
                        <strong>Time:</strong> {paymentTime}
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 1 }} />

                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: "rgba(44,94,120,1)" }}
                    >
                      Pet Details
                    </Typography>
                    <Typography variant="caption" display="block">
                      <strong>Pet Name:</strong> {inv.petName}
                    </Typography>
                    <Typography variant="caption" display="block">
                      <strong>Service:</strong> {inv.service}
                    </Typography>
                    <Typography variant="caption" display="block">
                      <strong>Payment:</strong> {inv.paymentMethod}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography fontWeight="bold" variant="caption">
                        Item
                      </Typography>
                      <Typography fontWeight="bold" variant="caption">
                        Amount
                      </Typography>
                    </Box>

                    {Array.isArray(inv.items) &&
                      inv.items.map((item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0.25,
                          }}
                        >
                          <Typography variant="caption">{item.name}</Typography>
                          <Typography variant="caption">
                            RS {item.price.toFixed(2)}
                          </Typography>
                        </Box>
                      ))}

                    <Divider sx={{ my: 0.5 }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 0.5,
                      }}
                    >
                      <Typography fontWeight="bold" variant="caption">
                        Total
                      </Typography>
                      <Typography fontWeight="bold" variant="caption">
                        RS {totalAmount.toFixed(2)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 1,
                      }}
                    >
                      <Chip
                        label={inv.status}
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.7rem",
                          color: "#fff",
                          background:
                            inv.status === "Paid"
                              ? "linear-gradient(90deg, #4ade80, #22c55e)"
                              : "linear-gradient(90deg, #facc15, #f59e0b)",
                          px: 1.5,
                        }}
                      />
                    </Box>
                  </Box>

{/* FOOTER BUTTONS */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      py: 1,
                      borderTop: "1px solid #e0e0e0",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<Eye size={16} />}
                      onClick={() => handleView(index)}
                      sx={{
                        background:
                          "linear-gradient(135deg, rgba(44,94,120,1), rgba(84,162,217,1))",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                        px: 2,
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, rgba(34,76,100,1), rgba(60,140,180,1))",
                        },
                      }}
                    >
                      View
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<Download size={16} />}
                      onClick={() => handleDownload(inv)}
                      sx={{
                        borderColor: "rgba(44,94,120,1)",
                        color: "rgba(44,94,120,1)",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                        px: 2,
                        "&:hover": {
                          backgroundColor: "rgba(44,94,120,0.05)",
                          borderColor: "rgba(44,94,120,1)",
                        },
                      }}
                    >
                      Download
                    </Button>
                  </Box>
                </Card>
              );
            })}
          </Box>
{/* Dialog for view and open */}
          {openDialog !== null && (
  <Dialog
    open={true}
    onClose={handleClose}
    maxWidth="md"
    fullWidth
    PaperProps={{
      sx: {
        borderRadius: 3,
        overflow: "visible",
        boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
        p: 0,
      },
    }}
  >
    {/* HEADER */}
    <Box
      sx={{
        background:
          "linear-gradient(135deg, rgba(44,94,120,1), rgba(84,162,217,1))",
        px: 4,
        py: 2,
        color: "#fff",
        fontWeight: "bold",
        fontSize: "1.2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography>Invoice Details</Typography>

      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{
          color: "#fff",
          background: "rgba(255,255,255,0.2)",
          "&:hover": { background: "rgba(255,255,255,0.3)" },
        }}
        size="small"
      >
        <X size={18} />
      </IconButton>
    </Box>

    {/* DIALOG CONTENT */}
    <DialogContent sx={{ p: 4, position: "relative", pt: 8 }}>
      {/* Date & Time top-right inside content */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 32,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 0.5,
          fontSize: "0.85rem",
          color: "rgba(44,94,120,1)",
          zIndex: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Calendar size={16} />
          <Typography>
            Date: {invoice[openDialog].paymentDoneDate}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Clock size={16} />
          <Typography>
            Time: {invoice[openDialog].time || paymentTime}
          </Typography>
        </Box>
      </Box>

      {/* Customer & Pet Details, Items, Total, Status */}
      {(() => {
        const inv = invoice[openDialog];
        const totalAmount = Array.isArray(inv.items)
          ? inv.items.reduce((sum, item) => sum + parseFloat(item.price), 0)
          : 0;

        return (
          <>
            {/* Customer & Pet Details */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                border: "1px solid #2c5e78",
                borderRadius: 2,
                overflow: "hidden",
                mb: 3,
                alignItems: "stretch", 
                minHeight: 120,
                flexDirection: { xs: "column", sm: "row" },

              }}
            >
              {/* Customer Details */}
              <Box
                sx={{
                  flex: 1,
                  minWidth: "50%",
                  bgcolor: "#ebf5ff",
                  p: 2,
                  borderRight: "1px solid #2c5e78",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  alignSelf: "stretch", // important for equal height
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1, color: "rgba(44,94,120,1)" }}
                >
                  Customer Details
                </Typography>
                <Typography>Name: {inv.CustomerName}</Typography>
                <Typography>Address: {inv.address}</Typography>
                <Typography>Zip Code: {inv.zipCode}</Typography>
                {inv.email && <Typography>Email: {inv.email}</Typography>}
                {inv.phone && <Typography>Phone: {inv.phone}</Typography>}

                {/* Validation Checks for fields*/}
                {(() => {
                  const emailValid = inv.email?.endsWith("@gmail.com");
                  const phoneValid = /^\d+$/.test(inv.phone || "");
                  const nameValid = /^[A-Za-z ]+$/.test(inv.CustomerName || "");

                  return (
                    <>
                      {!emailValid && (
                        <Typography
                          color="error"
                          variant="caption"
                          display="block"
                          sx={{ mt: 1 }}
                        >
                          Invalid Email (must end with @gmail.com)
                        </Typography>
                      )}
                      {!phoneValid && (
                        <Typography color="error" variant="caption" display="block">
                          Invalid Phone (numbers only)
                        </Typography>
                      )}
                      {!nameValid && (
                        <Typography color="error" variant="caption" display="block">
                          Invalid Name (alphabets only)
                        </Typography>
                      )}
                    </>
                  );
                })()}
              </Box>

              {/* Pet Details */}
              <Box
                sx={{
                  flex: 1,
                  minWidth: "50%",
                  bgcolor: "#ebf5ff",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  alignSelf: "stretch", // match height with customer box
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1, color: "rgba(44,94,120,1)" }}
                >
                  Pet Details
                </Typography>
                <Typography>Pet Name: {inv.petName}</Typography>
                {inv.petType && <Typography>Type: {inv.petType}</Typography>}
                {inv.petBreed && <Typography>Breed: {inv.petBreed}</Typography>}
                {inv.petAge && <Typography>Age: {inv.petAge}</Typography>}
                <Typography>Service: {inv.service}</Typography>
                <Typography>Payment: {inv.paymentMethod}</Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Items Table */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography fontWeight="bold">Item</Typography>
                <Typography fontWeight="bold" sx={{ textAlign: "right" }}>
                  Amount (RS)
                </Typography>
              </Box>

              {Array.isArray(inv.items) &&
                inv.items.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 120px",
                      p: 1,
                      borderBottom: "1px solid #eee",
                      wordBreak: "break-word",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{item.name}</Typography>
                    <Typography sx={{ textAlign: "right" }}>
                      RS {item.price.toFixed(2)}
                    </Typography>
                  </Box>
                ))}

              <Divider sx={{ my: 2 }} />

              {/* TOTAL: use same grid template so alignment matches exactly */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px",
                  p: 1,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ textAlign: "right" }}
                >
                  RS {totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* Status */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
                width: "100%",
                pr: 2,
              }}
            >
              <Chip
                label={inv.status}
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  color: "#fff",
                  ml: "auto",
                  background:
                    inv.status === "Paid"
                      ? "linear-gradient(90deg, #4ade80, #22c55e)"
                      : "linear-gradient(90deg, #facc15, #f59e0b)",
                  px: 2,
                  py: 0.5,
                }}
              />
            </Box>
          </>
        );
      })()}
    </DialogContent>
  </Dialog>
)}
        </Box>
      </Box>
    </>
  );
};

export default CustomerPayments;
