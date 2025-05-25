import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getDashboardURL } from "../api/userApi";

const UserDashboardTC = () => {
  const { user } = useAuth();
  const [dashboardURL, setDashboardURL] = useState("");
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchDashboardURL = async () => {
      try {
        const isAdmin = user?.role === "Admin";
        const url = await getDashboardURL(isAdmin ? "TC" : undefined);
        setDashboardURL(url || "");
      } catch (error) {
        console.error("Failed to fetch dashboard URL:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardURL();
  }, [user?.role]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 4 }}>
        TC Dashboard
      </Typography>

      <Paper
        elevation={3}
        sx={{
          height: "80vh",
          p: 2,
          borderRadius: 3,
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : dashboardURL ? (
          <iframe
            title="QlikSense Dashboard"
            src={dashboardURL}
            width="100%"
            height="100%"
            style={{
              border: "none",
              borderRadius: "12px",
            }}
            allowFullScreen
          />
        ) : (
          <Typography color="text.secondary">Dashboard not available.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default UserDashboardTC;
