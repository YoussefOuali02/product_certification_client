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
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/logo.jpg"; // ✅ Logo image

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
      elevation={2}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#e4f2f5 ", // ✅ Light Blue
        color: "#000", // Black text for contrast
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
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
            width: 150,
            objectFit: "contain",
          }}
        />

        {/* Right: User Info & Logout */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ bgcolor: "#191970", color: "#fff" }}>
              {getInitials(user?.username)}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {user?.username}
              </Typography>
              <Typography variant="caption" sx={{ color: "#333" }}>
                {user?.role}
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={() => {
              logout();
              navigate("/login");
            }}
            sx={{
              borderColor: "#191970",
              color: "#191970",
              "&:hover": {
                backgroundColor: "rgba(25, 25, 112, 0.1)",
                borderColor: "#191970",
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
