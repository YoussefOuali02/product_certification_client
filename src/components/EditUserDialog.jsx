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

  const isValid = () => {
    const { firstName, lastName, email } = form;
    const nameRegex = /^[a-zA-Z\s-]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      nameRegex.test(firstName) &&
      nameRegex.test(lastName) &&
      emailRegex.test(email)
    );
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      showMessage("Please fill all fields correctly", "error");
      return;
    }
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
          required
          label="First Name"
          name="firstName"
          margin="dense"
          inputProps={{
            minLength: 2,
            maxLength: 50,
            pattern: "^[a-zA-Z\\s-]+$",
          }}
          value={form.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          label="Last Name"
          name="lastName"
          margin="dense"
          inputProps={{
            minLength: 2,
            maxLength: 50,
            pattern: "^[a-zA-Z\\s-]+$",
          }}
          value={form.lastName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          label="Email"
          name="email"
          type="email"
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
