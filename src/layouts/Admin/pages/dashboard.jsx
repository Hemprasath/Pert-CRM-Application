import React from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Divider,
  Fade,
} from "@mui/material";

import {
  DollarSign,
  Users,
  Bone,
  CalendarCheck,
  LineChart as LineChartIcon,
  Bell,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  UserPlus,
  ClipboardCheck,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const drawerWidth = 260;

// ------------------------
// Reusable Stat Card
// ------------------------
const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <Fade in timeout={600}>
    <Card
      sx={{
        height: "100%",
        borderRadius: 5,
        position: "relative",
        overflow: "hidden",
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow:
          "0 8px 30px rgba(0,0,0,0.08), inset 0 0 20px rgba(255,255,255,0.2)",
        transition: "all 0.4s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            "0 12px 40px rgba(0,0,0,0.15), 0 0 25px rgba(84,162,217,0.3)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-40%",
          left: "-40%",
          width: "180%",
          height: "180%",
          background: color,
          opacity: 0.2,
          filter: "blur(60px)",
          transform: "rotate(25deg)",
          zIndex: 0,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
          p: 3,
        }}
      >
        {/* Left side - text */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#0A1F44",
              mt: 1,
              letterSpacing: 0.3,
            }}
          >
            {value}
          </Typography>

          {trend && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1.5 }}>
              {trend === "up" ? (
                <TrendingUp size={16} color="#22C55E" />
              ) : trend === "down" ? (
                <TrendingDown size={16} color="#EF4444" />
              ) : (
                <Minus size={16} color="#9CA3AF" />
              )}
              <Typography
                variant="caption"
                sx={{
                  ml: 0.8,
                  color:
                    trend === "up"
                      ? "#22C55E"
                      : trend === "down"
                      ? "#EF4444"
                      : "#9CA3AF",
                  fontWeight: 600,
                }}
              >
                {trend === "up"
                  ? "2.4% Growth"
                  : trend === "down"
                  ? "1.1% Drop"
                  : "Stable"}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Right side - icon */}
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: color,
            color: "white",
            boxShadow:
              "0 6px 18px rgba(0,0,0,0.2), inset 0 0 10px rgba(255,255,255,0.3)",
            position: "relative",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.1) rotate(6deg)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              width: "90%",
              height: "90%",
              borderRadius: "20px",
              border: "2px solid rgba(255,255,255,0.4)",
              top: "5%",
              left: "5%",
            },
          }}
        >
          <Icon size={30} />
        </Box>
      </CardContent>

      {/* Decorative circles for glow effect */}
      <Box
        sx={{
          position: "absolute",
          bottom: -25,
          right: -25,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: color,
          opacity: 0.08,
          filter: "blur(25px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: -20,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: color,
          opacity: 0.08,
          filter: "blur(30px)",
        }}
      />
    </Card>
  </Fade>
);

// ------------------------
// Chart Placeholder Components
// ------------------------
const chartData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3200 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 5300 },
  { month: "May", revenue: 6100 },
  { month: "Jun", revenue: 7500 },
  { month: "Jul", revenue: 6800 },
  { month: "Aug", revenue: 7900 },
  { month: "Sep", revenue: 7200 },
  { month: "Oct", revenue: 8800 },
  { month: "Nov", revenue: 9700 },
  { month: "Dec", revenue: 10400 },
];

const ChartBox = ({ title, icon: Icon, children }) => (
  <Paper
    sx={{
      p: 3,
      height: 420,
      width: 1140,
      borderRadius: 4,
      background: `
        radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 60%),
        linear-gradient(135deg, #ffffff, #f9fbff)
      `,
      boxShadow: `
        0 10px 30px rgba(0,0,0,0.05),
        inset 0 0 25px rgba(59,130,246,0.06)
      `,
      backdropFilter: "blur(6px)",
      border: "1px solid rgba(255,255,255,0.5)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 700,
        color: "#0A1F44",
        mb: 1.5,
      }}
    >
      <Icon size={22} style={{ marginRight: 8, color: "#3B82F6" }} /> {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    <Box
      sx={{
        height: "calc(100% - 60px)",
        width: "100%",
        borderRadius: 2,
        bgcolor: "#f9fbff",
        p: 2,
      }}
    >
      {children}
    </Box>
  </Paper>
);

// ------------------------
// Notifications Widget
// ------------------------
const notifications = [
  {
    icon: <ClipboardCheck size={20} color="#F59E0B" />,
    title: "Task: Inventory Check",
    desc: "Due today at 5:00 PM",
    color:
      "linear-gradient(135deg, rgba(255,184,0,0.15), rgba(255,255,255,0.7))",
  },
  {
    icon: <UserPlus size={20} color="#3B82F6" />,
    title: "New Customer: Jane Doe",
    desc: "Registered 5 minutes ago",
    color:
      "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(255,255,255,0.7))",
  },
  {
    icon: <AlertTriangle size={20} color="#EF4444" />,
    title: "Alert: Low Stock",
    desc: "Only 5 units of “Pet Food X” left",
    color:
      "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(255,255,255,0.7))",
  },
  {
    icon: <ClipboardCheck size={20} color="#10B981" />,
    title: "Task Completed: Vet Appointment",
    desc: "Marked as completed by John",
    color:
      "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(255,255,255,0.7))",
  },
  {
    icon: <UserPlus size={20} color="#8B5CF6" />,
    title: "New Member: David Lee",
    desc: "Joined loyalty program",
    color:
      "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(255,255,255,0.7))",
  },
  {
    icon: <AlertTriangle size={20} color="#F97316" />,
    title: "Reminder: Billing Update",
    desc: "Payment due in 2 days",
    color:
      "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(255,255,255,0.7))",
  },
];

const NotificationsWidget = () => (
  <Paper
    sx={{
      p: 3,
      height: "auto",
      width: 1140,
      borderRadius: 5,
      background: `
        radial-gradient(circle at top left, rgba(59,130,246,0.08), transparent 60%),
        linear-gradient(135deg, #ffffff, #f9fbff)
      `,
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.06), inset 0 0 25px rgba(84,162,217,0.04)",
      backdropFilter: "blur(8px)",
      overflow: "hidden",
      position: "relative",
    }}
  >
    {/* Soft glow background */}
    <Box
      sx={{
        position: "absolute",
        top: -60,
        right: -80,
        width: 220,
        height: 220,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)",
        filter: "blur(60px)",
      }}
    />

    <Typography
      variant="h6"
      gutterBottom
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 700,
        color: "#0A1F44",
        letterSpacing: 0.4,
        mb: 1.5,
      }}
    >
      <Bell size={22} style={{ marginRight: 10, color: "gold" }} />{" "}
      Notifications & Tasks
    </Typography>

    <Divider sx={{ mb: 3 }} />

    <Grid container spacing={2}>
      {notifications.map((n, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Box
            sx={{
              background: n.color,
              borderRadius: 3,
              p: 2,
              boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.5)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 25px rgba(0,0,0,0.08)",
              },
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                minWidth: 36,
                height: 36,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              {n.icon}
            </Box>
            <Box>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ color: "#0A1F44", mb: 0.3 }}
              >
                {n.title}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", opacity: 0.8 }}
              >
                {n.desc}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

// Dummy data for service usage
const data = [
  { name: "Grooming", value: 420 },
  { name: "Vet Visits", value: 310 },
  { name: "Training", value: 220 },
  { name: "Boarding", value: 180 },
  { name: "Adoptions", value: 90 },
];

// Gradient color palette
const COLORS = [
  "url(#grad1)",
  "url(#grad2)",
  "url(#grad3)",
  "url(#grad4)",
  "url(#grad5)",
];

// Reusable chart container
const PieChartBox = ({ title, icon: Icon, children }) => (
  <Paper
    sx={{
      p: 3,
      height: 460,
      width: 550,
      borderRadius: 5,
      background: `
        radial-gradient(circle at top left, rgba(59,130,246,0.08), transparent 60%),
        linear-gradient(135deg, #ffffff, #f9fbff)
      `,
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.06), inset 0 0 25px rgba(84,162,217,0.04)",
      backdropFilter: "blur(8px)",
      overflow: "hidden",
      position: "relative",
    }}
  >
    {/* Subtle gradient glow */}
    <Box
      sx={{
        position: "absolute",
        top: -60,
        right: -80,
        width: 220,
        height: 220,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)",
        filter: "blur(60px)",
      }}
    />

    <Typography
      variant="h6"
      gutterBottom
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 700,
        color: "#0A1F44",
        letterSpacing: 0.4,
        mb: 1.5,
      }}
    >
      <Icon size={22} style={{ marginRight: 8, color: "#3B82F6" }} /> {title}
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <Box
      sx={{
        height: "calc(100% - 60px)",
        width: "100%",
        borderRadius: 3,
        bgcolor: "rgba(249,251,255,0.6)",
        p: 2,
      }}
    >
      {children}
    </Box>
  </Paper>
);

// ------------------------
// Main Dashboard Component
// ------------------------
function AdminDashboardPage() {
  const email = "admin@demo.com";
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const dashboardData = [
    {
      title: "Revenue This Month",
      value: "$12,340",
      icon: DollarSign,
      color: "linear-gradient(135deg, #3B82F6, #2563EB)",
      trend: "up",
    },
    {
      title: "Total Customers",
      value: "210",
      icon: Users,
      color: "linear-gradient(135deg, #10B981, #059669)",
      trend: "up",
    },
    {
      title: "Active Pets",
      value: "120",
      icon: Bone,
      color: "linear-gradient(135deg, #F59E0B, #D97706)",
      trend: "stable",
    },
    {
      title: "Appointments Today",
      value: "45",
      icon: CalendarCheck,
      color: "linear-gradient(135deg, #EF4444, #DC2626)",
      trend: "down",
    },
  ];

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

        {/* Dashboard Heading */}
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
          <LineChart
            size={22}
            style={{
              marginLeft: 8,
              color: "#54A2D9",
              verticalAlign: "middle",
            }}
          />
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

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {dashboardData.map((data, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <StatCard {...data} />
            </Grid>
          ))}
        </Grid>

        {/* Charts & Widgets */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Make it full width */}
          <Grid item xs={12}>
            <ChartBox title="Revenue Trends" icon={LineChartIcon}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="10%"
                        stopColor="#3B82F6"
                        stopOpacity={0.3}
                      />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" tickMargin={8} />
                  <YAxis stroke="#64748B" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorRev)"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartBox>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <NotificationsWidget />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <PieChartBox title="Service Usage" icon={PieChartIcon}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#60A5FA"
                        stopOpacity={0.5}
                      />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#6EE7B7"
                        stopOpacity={0.5}
                      />
                    </linearGradient>
                    <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#FCD34D"
                        stopOpacity={0.5}
                      />
                    </linearGradient>
                    <linearGradient id="grad4" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#C4B5FD"
                        stopOpacity={0.5}
                      />
                    </linearGradient>
                    <linearGradient id="grad5" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#FCA5A5"
                        stopOpacity={0.5}
                      />
                    </linearGradient>
                  </defs>

                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={140}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={3}
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  {/* Center Total Label */}
                  <text
                    x="10%"
                    y="10%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={22}
                    fontWeight={700}
                    fill="#0A1F44"
                  >
                    {total}
                  </text>
                  <text
                    x="10%"
                    y="16%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={13}
                    fill="#64748B"
                  >
                    Total Services
                  </text>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                      fontSize: 13,
                    }}
                    formatter={(value, name) => [`${value} uses`, name]}
                  />

                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    formatter={(value) => (
                      <span style={{ color: "#0A1F44", fontSize: 13 }}>
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </PieChartBox>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AdminDashboardPage;