import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Avatar,
  Chip,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteUser } from "../api/userApi";
import { useState } from "react";
import EditUserDialog from "./EditUserDialog";
import { useSnackbar } from "../context/SnackbarContext";

const UserTable = ({ users, onRefresh }) => {
  const { showMessage } = useSnackbar();
  const [editingUser, setEditingUser] = useState(null);

const handleDelete = async (id) => {
  if (confirm("Are you sure?")) {
    try {
      await deleteUser(id);
      showMessage("User deleted", "success");
      onRefresh();
    } catch (error) {
      showMessage("Failed to delete user", "error");
    }
  }
};

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const name = `${params.row.firstName} ${params.row.lastName}`;
        return (
          <Avatar sx={{ bgcolor: stringToColor(name) }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        );
      },
    },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const mustChange = params.row.mustChangePassword;
        return (
          <Chip
            label={mustChange ? "Action Required" : "Verified"}
            sx={{
              bgcolor: mustChange ? "#FFA726" : "#66BB6A",
              color: "white",
              fontWeight: "bold",
            }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => setEditingUser(params.row)}
              sx={{ color: "#1976D2" }} // Blue
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDelete(params.row._id)}
              sx={{ color: "#D32F2F" }} // Red
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          disableRowSelectionOnClick
        />
      </div>
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={onRefresh}
        />
      )}
    </>
  );
};

export default UserTable;
