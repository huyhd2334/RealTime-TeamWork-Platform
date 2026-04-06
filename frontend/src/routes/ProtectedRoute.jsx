import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext()

  if (loading) return <div>Loading...</div>

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute