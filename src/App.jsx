import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ChangePassword from "./pages/ChangePassword";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  const { user } = useAuth();

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "Admin";
  const mustChangePassword = user?.mustChangePassword;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            mustChangePassword ? (
              <Navigate to="/change-password" replace />
            ) : isAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          ) : (
            <LoginPage />
          )
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            {isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/dashboard" replace />
            )}
          </PrivateRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <PrivateRoute>
            {mustChangePassword ? (
              <ChangePassword />
            ) : (
              <Navigate to="/dashboard" replace />
            )}
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
