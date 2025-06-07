import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";
import AuthPageWrapper from "./AuthPageWrapper";
import logo from "../../assets/logo.jpg"; // import logo like in LoginPage

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/change-password", { newPassword });
      alert("Password updated. Please log in again.");
      logout();
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Password update failed");
    }
  };

  return (
    <AuthPageWrapper>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Company Logo"
          sx={{ width: 200, mb: 2 }}
        />

        {/* Title */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Change Your Password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          For security, please set a new password
        </Typography>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            size="large"
            sx={{
              backgroundColor: "#2575fc",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#1f65d0" },
            }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </AuthPageWrapper>
  );
};

export default ChangePassword;