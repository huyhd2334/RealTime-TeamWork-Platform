import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext.jsx"

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuthContext()

  if (loading) return <div>Loading...</div>

  if (user) {
    return <Navigate to="/homepage" />
  }

  return children
}
export default GuestRoute