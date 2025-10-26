import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  CssBaseline,
  Toolbar,
  Card,
  Divider,
} from "@mui/material";
import { X, Upload, Image, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const drawerWidth = 260;

const CustomerAIassistant = () => {
  const email = "customer@demo.com";
  const [selectedImage, setSelectedImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dots, setDots] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [showFollowUp, setShowFollowUp] = useState(false);

  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5 * 1024 * 1024) {
      setSelectedImage(file);
      setError("");
    } else {
      setError("Please upload an image below 5MB in size.");
    }
  };

  const handleCancelImage = () => setSelectedImage(null);

  const handleAskAI = async (isFollowUp = false) => {
    const currentPrompt = isFollowUp ? followUp : prompt;
    if (!selectedImage && !isFollowUp) {
      setError("Please upload an image of your pet’s issue.");
      return;
    }
    if (!currentPrompt.trim()) {
      setError("Please describe your pet’s issue.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const newResponse = isFollowUp
        ? `Follow-up answer based on your question: "${currentPrompt}". AI suggests: Keep monitoring the pet and consult your vet if condition persists.`
        : "Based on the image and description, it appears your pet may have a minor skin irritation. Keep the area clean and avoid scratching. If it worsens, visit your vet.";
      setResponse(newResponse);
      setFollowUp("");
      setLoading(false);
    }, 2000);
  };

  const handleCloseAI = () => {
    setResponse("");
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
          AI Assistant
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

        {/* Main Card */}
        <Card
          sx={{
            width: "100%",
            maxWidth: "auto",
            mx: "auto",
            borderRadius: 4,
            p: { xs: 3, sm: 4 },
            position: "relative",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08), 0 8px 20px rgba(38,80,139,0.1), inset 0 0 10px rgba(255,255,255,0.5)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow:
                "0 10px 25px rgba(38,80,139,0.15), 0 20px 50px rgba(38,80,139,0.1), inset 0 0 12px rgba(255,255,255,0.5)",
            },
            overflow: "hidden",
          }}
        >
          {/* Decorative gradient stripe */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 6,
              background: "linear-gradient(90deg, #54A2D9, #8B7EAE)",
              borderRadius: "4px 4px 0 0",
            }}
          />

          <Typography
            variant="h5"
            fontWeight={800}
            color="#0A1F44"
            textAlign="center"
            mb={2}
            sx={{
              letterSpacing: 0.8,
              background: "linear-gradient(90deg, #0A1F44, #54A2D9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
            }}
          >
            AI Pet Health Analyzer
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            mb={3}
            sx={{ lineHeight: 1.7 }}
          >
            Upload an image of your pet’s{" "}
            <strong>wound, infection, or hair loss</strong> area, describe
            what’s happening, and let AI help you understand it.
          </Typography>

          <Divider sx={{ mb: 3, borderColor: "rgba(84,162,217,0.3)" }} />

          {/* Conditional Layout */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: response ? "row" : "column" }}
            gap={3}
          >
            {/* Left Column - User Input */}
            <Box flex={1}>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems="center"
                justifyContent="space-between"
                gap={3}
                mb={3}
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<Upload size={18} />}
                  sx={{
                    background:
                      "linear-gradient(90deg, #26508bff 0%, #75add2ff 100%)",
                    color: "#fff",
                    fontWeight: 600,
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none",
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  Upload Pet Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>

                {selectedImage ? (
                  <Box
                    sx={{
                      position: "relative",
                      width: 120,
                      height: 120,
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Pet issue"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                      }}
                      onClick={handleCancelImage}
                    >
                      <X size={16} />
                    </IconButton>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      border: "2px dashed #75add2ff",
                      borderRadius: 3,
                      width: 120,
                      height: 120,
                      color: "#75add2ff",
                    }}
                  >
                    <Image size={30} />
                    <Typography variant="caption" textAlign="center">
                      No image
                      <br />
                      uploaded
                    </Typography>
                  </Box>
                )}
              </Box>

              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Describe the issue:
              </Typography>

              <TextField
                fullWidth
                placeholder="e.g. My dog has a red patch on his leg that’s not healing..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                multiline
                rows={3}
                sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}
              />

              {error && (
                <Typography color="error" mb={2} fontSize={14}>
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                onClick={() => handleAskAI(false)}
                disabled={loading}
                startIcon={<Sparkles size={18} color="#fff" />}
                sx={{
                  background:
                    "linear-gradient(90deg, #26508bff 0%, #75add2ff 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  py: 1.3,
                  borderRadius: 3,
                  textTransform: "none",
                }}
              >
                <span style={{ color: "#fff" }}>
                  {loading ? `Processing${dots}` : "Ask AI for Help"}
                </span>
              </Button>
            </Box>

            {/* Right Column - AI Response */}
            {/* Right Column - AI Response */}
            {response && (
              <Box flex={1} position="relative">
                <Card
                  elevation={0}
                  sx={{
                    mt: { xs: 3, md: 0 },
                    borderRadius: 3,
                    background: "#f8fbff",
                    border: "1px solid rgba(117,173,210,0.3)",
                    p: 3,
                    height: "100%",
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                    }}
                    onClick={handleCloseAI}
                  >
                    <X size={16} />
                  </IconButton>

                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    AI Analysis Result:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {response}
                  </Typography>

                  {/* Follow-up Chat - Hidden initially */}
                  {!showFollowUp ? (
                    <Button
                      variant="outlined"
                      onClick={() => setShowFollowUp(true)}
                      sx={{ mt: 2 }}
                    >
                      Ask Follow-up Question
                    </Button>
                  ) : (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle2" mb={1}>
                        Ask follow-up question:
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Ask the AI about your pet..."
                        value={followUp}
                        onChange={(e) => setFollowUp(e.target.value)}
                        multiline
                        rows={2}
                        sx={{
                          mb: 2,
                          backgroundColor: "#f9f9f9",
                          borderRadius: 2,
                        }}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleAskAI(true)}
                        disabled={loading || !followUp.trim()}
                        startIcon={<Sparkles size={18} color="#fff" />}
                        sx={{
                          background:
                            "linear-gradient(90deg, #26508bff 0%, #75add2ff 100%)",
                          color: "#fff",
                          fontWeight: 600,
                          py: 1.3,
                          borderRadius: 3,
                          textTransform: "none",
                        }}
                      >
                        <span style={{ color: "#fff" }}>
                          {loading ? `Processing${dots}` : "Send Follow-up"}
                        </span>
                      </Button>
                    </>
                  )}
                </Card>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerAIassistant;
