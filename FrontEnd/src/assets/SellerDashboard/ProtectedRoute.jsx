import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const userData = localStorage.getItem("userData");
  if (!userData) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
