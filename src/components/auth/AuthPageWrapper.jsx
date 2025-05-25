import { Box, Paper } from "@mui/material";

const AuthPageWrapper = ({ children }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    sx={{
      background: "linear-gradient(to right, #e0eafc, #cfdef3)",
      padding: 2,
    }}
  >
    <Paper
      elevation={10}
      sx={{
        padding: 5,
        borderRadius: 4,
        minWidth: { xs: "100%", sm: 380 },
        maxWidth: 480,
        width: "100%",
      }}
    >
      {children}
    </Paper>
  </Box>
);

export default AuthPageWrapper;
