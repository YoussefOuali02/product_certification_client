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

const handleSubmit = async () => {
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
          label="First Name"
          name="firstName"
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="dense"
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
