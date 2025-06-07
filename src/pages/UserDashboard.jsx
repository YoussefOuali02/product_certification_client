import {
  Box,
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

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

const TC_DASHBOARD = CP_DASHBOARDS[2]; // Shared dashboard

const UserDashboard = () => {
  const { user } = useAuth();
  const [selectedDashboard, setSelectedDashboard] = useState(CP_DASHBOARDS[0].id);

  const isCP = user?.role === "CertificationProcess";
  const isTC = user?.role === "TC";

  const handleDashboardClick = (id) => {
    const dashboard = CP_DASHBOARDS.find((d) => d.id === id);
    if (dashboard) {
      setSelectedDashboard(id);
      window.open(dashboard.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 6 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 2 }}>
          {user?.role} Dashboard
        </Typography>

        {isCP && (
          <ToggleButtonGroup
            value={selectedDashboard}
            exclusive
            onChange={(_, newVal) => {
              if (newVal) handleDashboardClick(newVal);
            }}
            sx={{ mb: 4 }}
          >
            {CP_DASHBOARDS.map((d) => (
              <ToggleButton key={d.id} value={d.id}>
                {d.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}

        {isTC && (
          <ToggleButtonGroup
            value="dashboard3"
            exclusive
            onChange={() => handleDashboardClick("dashboard3")}
            sx={{ mb: 4 }}
          >
            <ToggleButton value="dashboard3">
              {TC_DASHBOARD.label}
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Container>
    </Box>
  );
};

export default UserDashboard;
