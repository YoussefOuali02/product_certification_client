import { Box, Button, Container, Typography, Paper, CircularProgress, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const CP_DASHBOARDS = [
  {
    id: "dashboard1",
    label: "Certification Dashboard 1",
    url: "https://srv-qliksense.wicsa.local/single/?appid=7f043b45-e08e-4d3e-a846-d65770d2b875&sheet=41b9c553-fe8c-42de-af09-1ea4b83350ec&opt=ctxmenu,currsel",
  },
  {
    id: "dashboard2",
    label: "Certification Dashboard 2",
    url: "https://srv-qliksense.wicsa.local/single/?appid=7f043b45-e08e-4d3e-a846-d65770d2b875&sheet=5fb4fc0f-d967-4066-b806-793511afccdc&opt=ctxmenu,currsel",
  },
  {
    id: "dashboard3",
    label: "Shared Dashboard",
    url: "https://srv-qliksense.wicsa.local/single/?appid=7f043b45-e08e-4d3e-a846-d65770d2b875&sheet=1d5e21b6-9505-476d-bbbd-e83e7ad68c91&opt=ctxmenu,currsel",
  },
];

const TC_DASHBOARD = CP_DASHBOARDS[2]; // Only the shared dashboard

const UserDashboard = () => {
  const { user } = useAuth();
  const [selectedDashboard, setSelectedDashboard] = useState(CP_DASHBOARDS[0].id);
  const [loading, setLoading] = useState(true);

  const isCP = user?.role === "CertificationProcess";
  const isTC = user?.role === "TC";

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate load
    return () => clearTimeout(timeout);
  }, [selectedDashboard]);

  const getDashboardURL = () => {
    if (isTC) return TC_DASHBOARD.url;
    const dashboard = CP_DASHBOARDS.find(d => d.id === selectedDashboard);
    return dashboard?.url || "";
  };

  const renderToggleButtons = () => {
    if (!isCP) return null;
    return (
      <ToggleButtonGroup
        value={selectedDashboard}
        exclusive
        onChange={(_, newVal) => newVal && setSelectedDashboard(newVal)}
        sx={{ mb: 4 }}
      >
        {CP_DASHBOARDS.map(d => (
          <ToggleButton key={d.id} value={d.id}>
            {d.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 6 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 2 }}>
          {user?.role} Dashboard
        </Typography>

        {renderToggleButtons()}

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
          ) : (
            <iframe
              title="QlikSense Dashboard"
              src={getDashboardURL()}
              width="100%"
              height="100%"
              style={{
                border: "none",
                borderRadius: "12px",
              }}
              allowFullScreen
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default UserDashboard;

