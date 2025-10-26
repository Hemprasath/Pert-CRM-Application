import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  Button,
  Grid,
  TextField,
  Rating,
} from "@mui/material";
import { Star, Gift, MessageCircle, Clock } from "lucide-react";

const CustomerSupport = () => {
  const [tab, setTab] = useState(0);
  const [rating, setRating] = useState(4);

  const handleChange = (event, newValue) => setTab(newValue);

  const loyaltyPoints = {
    balance: 350,
    conversionRate: "1 Point = ₹1",
    history: [
      { id: 1, type: "Earned", activity: "Vaccination", points: 100, date: "2025-09-10" },
      { id: 2, type: "Redeemed", activity: "Grooming Discount", points: 50, date: "2025-09-20" },
    ],
  };

  const feedbackHistory = [
    {
      id: 1,
      service: "Grooming",
      vet: "Dr. Smith",
      rating: 5,
      comment: "Excellent care and service!",
      date: "2025-09-25",
    },
    {
      id: 2,
      service: "Vaccination",
      vet: "Dr. Rose",
      rating: 4,
      comment: "Quick and professional.",
      date: "2025-09-12",
    },
  ];

  const  rewards = [
              { id: 1, title: "₹100 Off Grooming", points: 100 },
              { id: 2, title: "Free Checkup", points: 200 },
              { id: 3, title: "₹50 Discount Coupon", points: 50 },
            ]

  return (
    <>
          {/* Header */}
      <Box display="flex" alignItems="flex-start" mb={3} ml={7}>
        <Typography
          variant="h4"
          sx={{
            color: "#6A5ACD",
            fontWeight: 700,
            textShadow: "0 3px 10px rgba(0,0,0,0.2)",
          }}
        >
          Loyalty & Feedback
        </Typography>
      </Box>
    <Box sx={{ width: "100%", px: 4, py: 3, display:"flex",flexDirection:"column", alignItems:"flex-start", ml:"10"}}>


      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
        indicatorColor="secondary"
        sx={{
          width: "90%",
          ml:"7",
          maxWidth: 900,
          borderRadius: 3,
          mb: 2,
          bgcolor: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(10px)"
        }}
      >
        <Tab icon={<Star />} label="My Points Overview" />
        <Tab icon={<MessageCircle />} label="Submit Feedback" />
        <Tab icon={<Clock />} label="Feedback History" />
        <Tab icon={<Gift />} label="Rewards & Redemptions" />
      </Tabs>

      {/*  My Points Overview */}
{tab === 0 && (
<Box
  sx={{
    display: "flex",
    alignItems:"flex-start",
    mt: 4,
    ml:1
  }}
>
  <Card
    sx={{
      width: { xs: "95%", sm: 600 }, 
      p: 3,
      borderRadius: 3,
      background: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 32px rgba(106, 90, 205, 0.2)",
    }}
  >
    {loyaltyPoints?.history?.length > 0 ? (
      <>
        {/* Total Points Section */}
        <Typography variant="h6" fontWeight={600} textAlign="center">
          Total Points: {loyaltyPoints.balance}
        </Typography>

        <Typography color="text.secondary" textAlign="center" mb={2}>
          Conversion Rate: {loyaltyPoints.conversionRate}
        </Typography>

        {/* Action Buttons */}
        <Box mt={2} mb={3} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            sx={{
              padding: "10px 20px",
              background: "linear-gradient(to right, #3f87a6, #1f4f66)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Redeem Points
          </Button>
          <Button
            variant="outlined"
            sx={{
              padding: "10px 20px",
              background: "linear-gradient(to right, #3f87a6, #1f4f66)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            View History
          </Button>
        </Box>

        {/* Points History Section */}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          mb={2}
          textAlign="center"
        >
          Points History
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {loyaltyPoints.history.map((item) => (
            <Grid item xs={12} sm={10} key={item.id}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                  textAlign: "center", // centers content inside inner card
                }}
              >
                <Typography variant="body2" fontWeight={500}>
                  {item.type} – {item.activity}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {item.points} pts | {item.date}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    ) : (
      // Empty State
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ textAlign: "center", mt: 5, opacity: 0.7 }}
      >
        No Points Found
      </Typography>
    )}
  </Card>
</Box>


)}


      {/*  Submit Feedback */}
      {tab === 1 && (
        <Box   sx={{
    display: "flex",
    mt: 4,
  }}>
        <Card
          sx={{
            width: { xs: "95%", sm: 600 }, 
            p: 3,
            borderRadius: 3,
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(106,90,205,0.2)",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Submit Your Feedback
          </Typography>
          <TextField
            fullWidth
            label="Service Name"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Comments"
            multiline
            rows={3}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography sx={{ mr: 1 }}>Rating:</Typography>
            <Rating value={rating} onChange={(e, v) => setRating(v)} />
          </Box>
          <Button variant="contained" sx={{
              padding: "10px 20px",
              background: "linear-gradient(to right, #3f87a6, #1f4f66)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
            Submit Feedback
          </Button>
        </Card>
        </Box>
      )}

      {/*  Feedback History */}
{tab === 2 && (
  <>
    {feedbackHistory && feedbackHistory.length > 0 ? (
      <Grid container spacing={3}>
        {feedbackHistory.map((fb) => (
          <Grid item xs={12} md={6} key={fb.id}>
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 16px rgba(106,90,205,0.15)",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {fb.service}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vet: {fb.vet} | Date: {fb.date}
              </Typography>
              <Rating value={fb.rating} readOnly size="small" />
              <Typography variant="body2" mt={1}>
                "{fb.comment}"
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      // No Feedback Message
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ textAlign: "center", mt: 5, opacity: 0.7 }}
      >
        No Feedback Found
      </Typography>
    )}
  </>
)}


      {/*  Rewards & Redemptions */}
{tab === 3 && (
  <Box>
    {rewards && rewards.length > 0 ? (
      <Grid container spacing={3}>
        {rewards.map((reward) => (
          <Grid item xs={12} md={4} key={reward.id}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, rgba(173,216,230,0.4), rgba(106,90,205,0.3))",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
            >
              <Gift sx={{ fontSize: 40, color: "#6A5ACD", mb: 1 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                {reward.title}
              </Typography>
              <Typography color="text.secondary">
                {reward.points} Points
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background: "#6A5ACD",
                  borderRadius: "20px",
                  textTransform: "none",
                }}
              >
                Redeem
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ textAlign: "center", mt: 5, opacity: 0.7 }}
      >
        No Rewards Available
      </Typography>
    )}
  </Box>
)}
    </Box>
    </>
  );
};



export default CustomerSupport;
