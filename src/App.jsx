import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/auth/LoginPage";
import ChangePassword from "./components/auth/ChangePassword";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import LoginRedirector from "./components/auth/LoginRedirector";
import UserDashboardTC from "./pages/UserDashboardTC";
import UserDashboardCP from "./pages/UserDashbordCP";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  const { user, loading } = useAuth();

  const isAuthenticated = !!user;
  const mustChangePassword = user?.mustChangePassword;

  if (loading) {
    // Add a loading state to prevent early rendering
    return <div>Loading...</div>;
  }

  return (
     <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <LoginRedirector /> : <LoginPage />
        }
      />
      <Route
        path="/change-password"
        element={
          isAuthenticated && mustChangePassword ? (
            <ChangePassword />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute roles={["Admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-dashboard"
        element={
          <PrivateRoute roles={["TC", "Admin"]}>
            <UserDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-dashboard"
        element={
          <PrivateRoute roles={["CertificationProcess", "Admin"]}>
            <UserDashboard />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
