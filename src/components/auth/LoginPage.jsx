import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import AuthPageWrapper from "./AuthPageWrapper";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password }
      );
      login(res.data.token);
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  useEffect(() => {
    if (user) {
      if (user.mustChangePassword) {
        navigate("/change-password");
      } else if (user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [user, navigate]);

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
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Please login to continue
        </Typography>

        {/* Login Form */}
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
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            size="large"
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#2575fc",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#1f65d0" },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </AuthPageWrapper>
  );
};

export default LoginPage;
