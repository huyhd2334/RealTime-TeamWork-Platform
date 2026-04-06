import api from '@/lib/axios'

export const getMeService = async () => {
  const res = await api.get("/auth/me", { withCredentials: true })
  return res.data
}

export const loginService = async ({ accountName, passW }) => {
  console.log(accountName)
  const res = await api.post("auth/login",{ user_account: accountName, password: passW, device: "web" },
                                           { withCredentials: true })
  return res.data
}

export const signupService = async ({ userName, accountName, passW }) => {
  const res = await api.post("auth/signup", {userName, accountName, passW})
  return res.data
}