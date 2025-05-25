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
  ],
  TC: [
    {
      label: "TC Dashboard",
      path: "/tc-dashboard",
      icon: <DashboardIcon />,
    },
  ],
  CertificationProcess: [
    {
      label: "Certification Dashboard",
      path: "/certification-dashboard",
      icon: <DashboardIcon />,
    },
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
        {items.map(({ label, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <ListItemButton
              key={label}
              component={Link}
              to={path}
              selected={isActive}
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
