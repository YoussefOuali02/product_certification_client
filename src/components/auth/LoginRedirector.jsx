import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginRedirector = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "Admin") return <Navigate to="/admin" replace />;
  if (user.role === "TC") return <Navigate to="/user-dashboard" replace />;
  if (user.role === "CertificationProcess")
    return <Navigate to="/user-dashboard" replace />;

  return <Navigate to="/login" replace />;
};

export default LoginRedirector;
