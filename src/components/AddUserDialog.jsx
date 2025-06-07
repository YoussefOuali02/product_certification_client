import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { createUser } from "../api/userApi";
import { useSnackbar } from "../context/SnackbarContext";

const AddUserDialog = ({ open, onClose, onSuccess }) => {
  const { showMessage } = useSnackbar();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "TC",
  });

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
      await createUser(form);
      showMessage("User created successfully!", "success");
      onSuccess();
      onClose();
      setForm({ firstName: "", lastName: "", email: "", role: "TC" });
    } catch (error) {
      showMessage("Failed to create user", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New User</DialogTitle>
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
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
