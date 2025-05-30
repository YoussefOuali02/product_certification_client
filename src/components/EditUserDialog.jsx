import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { updateUser } from "../api/userApi";
import { useSnackbar } from "../context/SnackbarContext";

const EditUserDialog = ({ user, onClose, onSuccess }) => {
  const { showMessage } = useSnackbar();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async () => {
  try {
    await updateUser(user._id, form);
    showMessage("User updated successfully!", "success");
    onSuccess();
    onClose();
  } catch (err) {
    showMessage("Failed to update user", "error");
  }
};

  if (!user) return null;

  return (
    <Dialog open={Boolean(user)} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          margin="dense"
          value={form.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          margin="dense"
          value={form.lastName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="dense"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          select
          fullWidth
          label="Role"
          name="role"
          margin="dense"
          value={form.role}
          onChange={handleChange}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="TC">TC</MenuItem>
          <MenuItem value="CertificationProcess">CertificationProcess</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
