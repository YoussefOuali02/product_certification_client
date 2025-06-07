import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginRedirector = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  // ✅ Redirect to change-password first if needed
  if (user.mustChangePassword) {
    return <Navigate to="/change-password" replace />;
  }

  if (user.role === "Admin") return <Navigate to="/admin" replace />;
  if (["TC", "CertificationProcess"].includes(user.role)) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default LoginRedirector;