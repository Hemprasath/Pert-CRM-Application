import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { PawPrint, Lock, LogIn, HelpCircle, UserPlus } from "lucide-react";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Singup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@demo.com" && password === "Admin@123") {
      navigate("/Admin/pages/dashboard");
    } else if (email === "staff@demo.com" && password === "Staff@123") {
      navigate("/Staff/pages/dashboard");
    } else if (email === "customer@demo.com" && password === "Customer@123") {
      navigate("/Customer/pages/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* LEFT SIDE CONTENT */}
      <Box
        sx={{
          flex: 1,
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
          background:
            "linear-gradient(135deg, #352F5C 0%, #289DD9 40%, #94C8E9 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Glowing Bubbles */}
        <Box
          sx={{
            position: "absolute",
            top: 50,
            left: 100,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            filter: "blur(80px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 120,
            right: 60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(40,157,217,0.25)",
            filter: "blur(100px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />

        {/* Floating Pet Icons */}
        <Box
          sx={{
            position: "absolute",
            top: 120,
            left: 40,
            fontSize: 36,
            animation: "float 7s ease-in-out infinite",
            color: "#fff", // makes emoji white (browser-dependent)
            textShadow: "0 0 10px rgba(255,255,255,0.8)", // glowing white paw
          }}
        >
          🐾
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 80,
            left: 80,
            fontSize: 40,
            animation: "float 9s ease-in-out infinite",
            color: "#fff", // makes emoji white (browser-dependent)
            textShadow: "0 0 10px rgba(255,255,255,0.8)", // glowing white paw
          }}
        >
          🐕
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 160,
            right: 120,
            fontSize: 34,
            animation: "float 10s ease-in-out infinite",
            color: "#fff", // makes emoji white (browser-dependent)
            textShadow: "0 0 10px rgba(255,255,255,0.8)", // glowing white paw
          }}
        >
          🐈
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 180,
            right: 40,
            fontSize: 32,
            animation: "float 12s ease-in-out infinite",
            color: "#fff", // makes emoji white (browser-dependent)
            textShadow: "0 0 10px rgba(255,255,255,0.8)", // glowing white paw
          }}
        >
          🐦
        </Box>

        {/* Logo + Title */}
        <PawPrint size={72} style={{ color: "#fff" }} />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mt: 3,
            textAlign: "center",
            background: "#ffffff",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: 2,
            textTransform: "uppercase",
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "50%",
              bottom: -6,
              transform: "translateX(-50%)",
              width: "60%",
              height: "4px",
              borderRadius: "2px",
              background:
                "linear-gradient(90deg, #00f2ffff, #ffffffff, #b7b3ffff, #00E5FF)",
              backgroundSize: "200% 100%",
              animation: "glowUnderline 3s linear infinite",
            },
            "@keyframes glowUnderline": {
              "0%": { backgroundPosition: "0% 50%" },
              "100%": { backgroundPosition: "200% 50%" },
            },
          }}
        >
          Pet Care CRM
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 2,
            textAlign: "center",
            lineHeight: 1.8,
            maxWidth: 560,
            mx: "auto",
            fontWeight: 400,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: 1,
            color: "#ffffff",
            textShadow:
              "0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(108,99,255,0.5)",
            opacity: 0.95,
          }}
        >
          Manage your pets, appointments, and wellness <br />
          with AI-powered insights & IoT integration.
        </Typography>

        {/* Feature Bubbles */}
        <Box
          sx={{
            mt: 5,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            width: "100%",
            maxWidth: 480,
          }}
        >
          {[
            {
              emoji: "🐶",
              title: "Appointments",
              desc: "Vet visits & grooming",
            },
            { emoji: "🩺", title: "Health Tracking", desc: "Vaccines & meds" },
            { emoji: "🤖", title: "AI Insights", desc: "Predict health risks" },
            {
              emoji: "📡",
              title: "IoT Devices",
              desc: "Smart collars & trackers",
            },
          ].map((f, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: "rgba(255,255,255,0.15)",
                borderRadius: "24px 0px 24px 0px",
                p: 2,
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
                },
              }}
            >
              {/* Left Emoji Circle */}
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  animation: `float ${3 + i}s ease-in-out infinite`,
                  flexShrink: 0,
                }}
              >
                {f.emoji}
              </Box>

              {/* Right Content */}
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    textShadow: "0 0 6px rgba(168,85,247,0.6)",
                    letterSpacing: 0.5,
                  }}
                >
                  {f.title}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  {f.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <style>
          {`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
`}
        </style>

        {/* AI Badge */}
        <Link
          href="https://www.frontial.com/"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            display: "inline-block",
            mt: 4,
            px: 3,
            py: 1,
            borderRadius: "50px",
            fontWeight: "bold",
            fontSize: 14,
            color: "#fff",
            background: "linear-gradient(90deg, #289DD9, #54A2D9, #94C8E9)",
            boxShadow: "0 4px 14px rgba(40,157,217,0.6)",
            animation: "pulse 2.5s infinite",
            cursor: "pointer",
            transition: "all 0.3s ease",
            textAlign: "center",
            "&:hover": {
              transform: "scale(1.08) rotate(-1deg)",
              boxShadow: "0 6px 24px rgba(40,157,217,0.85)",
              background: "linear-gradient(90deg, #1e88e5, #42a5f5, #90caf9)",
            },
          }}
        >
          🚀 Powered by{" "}
          <span style={{ fontWeight: "900" }}>Frontial Technologies</span>
        </Link>

        <style>
          {`
  @keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 10px rgba(40,157,217,0.5); }
    50% { transform: scale(1.05); box-shadow: 0 0 22px rgba(84,162,217,0.7); }
    100% { transform: scale(1); box-shadow: 0 0 10px rgba(40,157,217,0.5); }
  }
`}
        </style>

        {/* Keyframes for animations */}
        <style>
          {`
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
    `}
        </style>
      </Box>

      {/* RIGHT SIDE LOGIN FORM */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "15px",
            height: "100%",
            background: "linear-gradient(180deg, #0A1F44, #1E3A8A, #2563EB)",
            clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0 100%)",
          },
        }}
      >
        {showForgot ? (
          <ForgotPassword onBack={() => setShowForgot(false)} />
        ) : showSignup ? (
          <Signup onBack={() => setShowSignup(false)} />
        ) : (
          <Card
            sx={{
              width: "100%",
              maxWidth: 420,
              boxShadow: 6,
              borderRadius: 4,
              borderLeft: "6px solid #289DD9",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background:
                      "linear-gradient(135deg, #289DD9, #54A2D9, #94C8E9)",
                    boxShadow: "0 4px 10px rgba(40,157,217,0.4)",
                  }}
                >
                  <Lock size={22} color="#fff" />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    ml: 1.5,
                    background:
                      "linear-gradient(90deg, #352F5C, #289DD9, #54A2D9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Welcome Back
                </Typography>
              </Box>

              <form onSubmit={handleLogin}>
                <TextField
                  label="Username / Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.5,
                    background: "linear-gradient(90deg, #289DD9, #54A2D9)",
                    borderRadius: 2,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.2,
                    boxShadow: "0px 4px 12px rgba(40,157,217,0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(90deg, #54A2D9, #94C8E9)",
                      boxShadow: "0px 6px 16px rgba(40,157,217,0.6)",
                      transform: "translateY(-2px)",
                    },
                    "&:active": {
                      transform: "scale(0.97)",
                      boxShadow: "0px 3px 8px rgba(40,157,217,0.5)",
                    },
                  }}
                >
                  <LogIn size={20} />
                  Login
                </Button>
              </form>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 14,
                }}
              >
                {/* Forgot Password */}
                <Link
                  component="button"
                  underline="none"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "#F57C00", // orange for recovery
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#EF6C00", // darker orange on hover
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    },
                  }}
                  onClick={() => setShowForgot(true)}
                >
                  <HelpCircle size={16} />
                  Forgot Password?
                </Link>

                {/* Sign Up */}
                <Link
                  component="button"
                  underline="none"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "#2E7D32", // green for new user
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#1B5E20", // darker green on hover
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    },
                  }}
                  onClick={() => setShowSignup(true)}
                >
                  <UserPlus size={16} />
                  New User? Signup
                </Link>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}

export default Login;
