import { useAuth } from "./auth/authContext";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
