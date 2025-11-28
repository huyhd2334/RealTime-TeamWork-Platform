import React, { useState } from 'react'
import { Button } from '../ui/button'
import api from '@/lib/axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const mainAuth = () => {
  const [userName, setUserName] = useState("")
  const [accountName, setAccountName] = useState("")
  const [passW, setPassW] = useState("")

  const [showSignup, setShowSignup] = useState(false)
  const navigate = useNavigate()
  const handleLogin = async() => {
      try{
      // api + jwt
      const res = await api.post("/auth/login", 
                                 { accountName, passW: passW }, 
                                 { withCredentials: true }) // cookie refreshToken 
      if(res.data.message){
        const accessToken = res.data.accessToken
        localStorage.setItem("accessToken", accessToken) 

        localStorage.setItem("userAccount", accountName);
        navigate("/createroom", { state: { user: accountName}})
        toast.success(res.data.detail)
        setAccountName("")
        setPassW("")
        }else{toast.error("invalid password or account name")}
      }catch(error){
        toast.error("error when call login")
        console.log("error when call /auth/login", error)
        console.log(error.request)
      } 
   }
  const handleSignup = async() => {
    try {
      if (!accountName || !passW || !userName) {
        return toast.error("imformation is empty")
      }
      const res = await api.post("/auth/signup", {userName, accountName, passW: passW })
      if (res.data.message) {
        toast.success("signup successfull")
        toast.info("login now!")
        setShowSignup(pre => !pre)
        setUserName("")
        setAccountName("")
        setPassW("")
        } else {toast.error("Account Name invalid!")}
      }catch (error) {
        toast.error("error when call signup")
        console.log("error when call /auth/signup", error)}
  }
  return (
    <div>
      {!showSignup 
      ?
      <div className='flex flex-row items-center space-x-5 w-150 h-90 overflow-hidden'>
      <div className={`flex flex-col justify-items-start items-center space-y-4 w-[250px] h-[300px] translate-x-2 mt-16 bg-cover bg-center transform opacity-100 -translate-x-5 transition-all ease-in-out duration-500 delay-100}`}>
        <span className='text-2xl font-bold text-gray-700'> WELLCOME BACK </span>
        <input id="useraccount" type="text" 
               className='bg-gray-200 rounded-lg h-8 pl-2'
               placeholder='user account'
               value={accountName}
               onChange={(e) => setAccountName(e.target.value)}/>
        <input id="userpassword" type="text" 
               className='bg-gray-200 rounded-lg h-8 pl-2'
               placeholder='passwords'
               value={passW}
               onChange={(e) => setPassW(e.target.value)}/>
        <Button className="w-[150px] h-7 text-white font-semibold text-sm" onClick={handleLogin}> Login </Button>
      </div>
      <div className="relative w-100 h-full rounded-4xl bg-cover bg-center bg-cover bg-center transform transition-transform duration-500 ease-in-out translate-x-0 delay-100" 
          style={{ backgroundImage: "url('/bg_login.jpg')" }}>
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
          <Button className="w-40 h-15 absolute top-[170px] left-[50px] left-24 bg-transparent text-white hover:opacity-100 text-lg" onClick={() => {setShowSignup(pre => !pre)}}>"SIGNUP NOW"</Button>
        </h1>
        <h1 className='absolute flex top-10 left-22 items-center justify-center text-white text-6xl font-bold'>HELLO</h1>
        <a className='absolute top-30 left-10 flex items-center justify-center text-white text-sm font-semibold'>
           Is this your first time visiting my website?
        </a>
      </div>
      </div>
      :
      <div className='flex flex-row items-center space-x-5 w-150 h-90'>
      <div className='flex flex-col justify-items-start items-center space-y-3 w-[250px] h-[300px] transform -translate-x-2 mt-16 bg-cover bg-center transform transition-transform duration-500 ease-in-out translate-x-90 delay-75'>
        <span className='text-4xl font-bold text-gray-700'> Hello ✨</span>
        <input id="username" type="text" 
               className='bg-gray-200 rounded-lg h-8 pl-2'
               placeholder='user name'
               value={userName}
               onChange={(e) => setUserName(e.target.value)}/>
        <input id="useraccount" type="text" 
               className='bg-gray-200 rounded-lg h-8 pl-2'
               placeholder='user account'
               value={accountName}
               onChange={(e) => setAccountName(e.target.value)}/>
        <input id="userpassword" type="text" 
               className='bg-gray-200 rounded-lg h-8 pl-2'
               placeholder='passwords'
               value={passW}
               onChange={(e) => setPassW(e.target.value)}/>
        <Button className="w-[150px] h-7 text-white font-semibold text-sm" onClick={handleSignup}> Sign Up </Button>
      </div>
      <div className="relative w-100 h-full rounded-4xl bg-cover bg-center transform transition-transform duration-500 ease-in-out -translate-x-62 delay-75" style={{ backgroundImage: "url('/bg_login.jpg')" }}>
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
          <Button className="w-40 h-15 absolute top-[170px] left-[50px] left-24 bg-transparent text-white hover:opacity-100 text-lg" onClick={() => {setShowSignup(pre => !pre)}}>"SIGNUP NOW"</Button>
        </h1>
        <h1 className='absolute flex top-10 left-22 items-center justify-center text-white text-6xl font-bold'>HELLO</h1>
        <a className='absolute top-30 left-10 flex items-center justify-center text-white text-sm font-semibold'>
           Is this your first time visiting my website?
        </a>
      </div>
      </div>
    }
    </div>
  )
}
export default mainAuth
