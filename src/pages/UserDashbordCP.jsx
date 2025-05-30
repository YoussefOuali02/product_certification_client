import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
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
        const url = await getDashboardURL(
          isAdmin ? "CertificationProcess" : undefined
        );
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
              src="https://srv-qliksense.wicsa.local/single/?appid=7f043b45-e08e-4d3e-a846-d65770d2b875&sheet=41b9c553-fe8c-42de-af09-1ea4b83350ec&opt=ctxmenu,currsel"
              style={{border:"none",width:"100%",height:"100%"}}
            ></iframe>
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
