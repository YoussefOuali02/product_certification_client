import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

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
      login(res.data.token); // user will be set in context here
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
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 300,
              height: 100,
              mb: 2,
              mx: "auto",
            }}
          />
          {/* Title */}
          <Typography
            variant="h5"
            component="h1"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Welcome
          </Typography>
          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 2,
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
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              sx={{
                mt: 1,
                backgroundColor: "#2575fc",
                "&:hover": { backgroundColor: "#1f65d0" },
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
