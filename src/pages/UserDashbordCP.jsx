import { Box, Button, Container, Typography, Paper, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getDashboardURL } from "../api/userApi";

const UserDashboardCP = () => {
  const { user, logout } = useAuth();
  const [dashboardURL, setDashboardURL] = useState("");
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchDashboardURL = async () => {
      try {
        const isAdmin = user?.role === "Admin";
        const url = await getDashboardURL(isAdmin ? "CertificationProcess" : undefined);
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
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
            {user?.role} Dashboard
          </Typography>
        </Box>

        {/* Dashboard Content */}
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
            <Typography color="text.secondary">
              Dashboard not available.
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default UserDashboardCP;
