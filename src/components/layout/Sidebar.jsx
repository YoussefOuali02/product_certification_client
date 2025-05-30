import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const drawerWidth = 250;

const predictionsItem = {
  label: "Predictions",
  path: "http://localhost:8501/",
  icon: <DashboardIcon />,
  external: true,
};
const roleItems = {
  Admin: [
    {
      label: "Admin Dashboard",
      path: "/admin",
      icon: <AdminPanelSettingsIcon />,
    },
  ],
  TC: [
    {
      label: "TC Dashboard",
      path: "/user-dashboard",
      icon: <DashboardIcon />,
    },
    predictionsItem,
  ],
  CertificationProcess: [
    {
      label: "Certification Dashboard",
      path: "/user-dashboard",
      icon: <DashboardIcon />,
    },
    predictionsItem,
  ],
};

const Sidebar = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const location = useLocation();

  const items = roleItems[user?.role || "TC"];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#191970", // Midnight Blue
          borderRight: `1px solid ${theme.palette.divider}`,
          color: "#fff",
        },
      }}
    >
      <Toolbar />
      <List sx={{ paddingTop: 2 }}>
        {items.map(({ label, path, icon, external }) => {
          const isActive = location.pathname === path;
          const listItemProps = external
            ? {
                component: "a",
                href: path,
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {
                component: Link,
                to: path,
              };

          return (
            <ListItemButton
              key={label}
              {...listItemProps}
              selected={!external && isActive}
              sx={{
                mb: 1,
                borderRadius: 1,
                mx: 1,
                color: "#fff",
                backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "inherit",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {icon && (
                <ListItemIcon sx={{ color: "#fff" }}>{icon}</ListItemIcon>
              )}
              <ListItemText primary={label} />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
