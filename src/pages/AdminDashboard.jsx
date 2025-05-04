import { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
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
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add User
        </Button>
      </Box>
      <UserTable users={users} onRefresh={fetchUsers} />
      <AddUserDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={fetchUsers}
      />
    </Container>
  );
};

export default AdminDashboard;
