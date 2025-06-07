import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Box,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { getUsers } from "../api/userApi";
import UserTable from "../components/UserTable";
import AddUserDialog from "../components/AddUserDialog";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to fetch users",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mb: 3,
              flexWrap: "wrap",
            }}
          >
            {/* Left: Search Input */}
            <Box
              component="input"
              type="text"
              placeholder="Search users..."
              onChange={(e) => handleSearch(e.target.value)}
              sx={{
                px: 2,
                py: 1,
                border: "1px solid #ccc",
                borderRadius: 2,
                minWidth: 250,
              }}
            />

            {/* Right: Add User Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenAdd(true)}
              sx={{ marginLeft: "auto" }}
            >
              Add User
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* User Table */}
          <UserTable
            users={users.filter(
              (user) =>
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            onRefresh={fetchUsers}
          />
        </Paper>

        {/* Dialog */}
        <AddUserDialog
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          onSuccess={fetchUsers}
        />
      </Container>

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
    </Box>
  );
};

export default AdminDashboard;
