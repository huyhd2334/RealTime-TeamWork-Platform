import { loginService, signupService } from "@/service/authService.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { useAuthContext } from "@/context/AuthContext"

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const {loginContex} = useAuthContext()
  const login = async (accountName, passW) => {
    try {
      setLoading(true)
      const data = await loginService({ accountName, passW })

      if (data.success) {
        localStorage.setItem("userAccount", JSON.stringify(data.user))
        loginContex(data.user)
        toast.success(data.message)
        navigate("/homepage")
      } else {
        toast.error("invalid password or account name")
      }
    } catch (err) {
      toast.error("error when call login")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userName, accountName, passW) => {
    try {
      if (!userName || !accountName || !passW) {
        return toast.error("information is empty");
      }
      setLoading(true)
      const data = await signupService({ userName, accountName, passW })

      if (data.success) {
        toast.success("signup successful")
        toast.info("login now!")
      } else {
        toast.error("Account Name invalid!")
      }
    } catch (err) {
      toast.error("error when call signup")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return { login, signup, loading }
}