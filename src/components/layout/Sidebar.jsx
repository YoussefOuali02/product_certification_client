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
// Add this item once for reuse
const predictionsItem = {
  label: "Predictions",
  path: "http://localhost:8501/",
  icon: <DashboardIcon />,
  external: true,
};

// Append the predictions item to each role
const roleItems = {
  Admin: [
    {
      label: "Admin Dashboard",
      path: "/admin",
      icon: <AdminPanelSettingsIcon />,
    },
    {
      label: "TC Dashboard",
      path: "/tc-dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Certification Dashboard",
      path: "/certification-dashboard",
      icon: <DashboardIcon />,
    },
    predictionsItem,
  ],
  TC: [
    {
      label: "TC Dashboard",
      path: "/tc-dashboard",
      icon: <DashboardIcon />,
    },
    predictionsItem,
  ],
  CertificationProcess: [
    {
      label: "Certification Dashboard",
      path: "/certification-dashboard",
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
          backgroundColor: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.divider}`,
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
                color: isActive
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {icon && (
                <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
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
