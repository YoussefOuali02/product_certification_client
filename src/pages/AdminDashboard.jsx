import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { getUsers } from "../api/userApi";
import UserTable from "../components/UserTable";
import AddUserDialog from "../components/AddUserDialog";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Admin Dashboard
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenAdd(true)}
              >
                Add User
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* User Table */}
          <UserTable users={users} onRefresh={fetchUsers} />
        </Paper>

        {/* Dialog */}
        <AddUserDialog
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          onSuccess={fetchUsers}
        />
      </Container>
    </Box>
  );
};

export default AdminDashboard;
