import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Box component="main" sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {/* offset for fixed AppBar */}
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
