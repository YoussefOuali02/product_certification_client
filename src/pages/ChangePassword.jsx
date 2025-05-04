import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

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
    <Container maxWidth="xs">
      <Typography variant="h5" align="center" sx={{ mt: 5 }}>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Change
        </Button>
      </form>
    </Container>
  );
};

export default ChangePassword;
