import { getMeService } from "@/service/authService.js";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // AUTO LOGIN JWT
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMeService()
        if (data.success) {
          setUser(data.user)
        }
      } catch (err) {
        console.log("Not logged in")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const loginContex = (userData) => {
    setUser(userData)
  }

  const logoutContex = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loginContex, logoutContex, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)