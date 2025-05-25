import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/logo.jpg"; // ✅ Import logo

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        {/* Left: Logo */}
        <Box
          component="img"
          src={logo}
          alt="Company Logo"
          sx={{
            height: 48,
            width: 150, // ✅ Improved width
            objectFit: "contain",
          }}
        />

        {/* Right: User info + Logout */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {getInitials(user?.username)}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {user?.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.role}
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="outlined"
            size="small"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => {
              logout();
              navigate("/login");
            }}
            sx={{
              borderColor: theme.palette.divider,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                borderColor: theme.palette.text.primary,
              },
            }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
