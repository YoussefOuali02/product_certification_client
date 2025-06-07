import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";
import AuthPageWrapper from "./AuthPageWrapper";
import logo from "../../assets/logo.jpg";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // or "error"
  });

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/change-password", { newPassword });
      setSnackbar({
        open: true,
        message: "Password updated. Please log in again.",
        severity: "success",
      });

      // Delay logout & redirect to let user see the snackbar
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Password update failed",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AuthPageWrapper>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box component="img" src={logo} alt="Company Logo" sx={{ width: 200, mb: 2 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Change Your Password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          For security, please set a new password
        </Typography>

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

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthPageWrapper>
  );
};

export default ChangePassword;
