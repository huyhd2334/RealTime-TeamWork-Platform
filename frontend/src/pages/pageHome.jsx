import MainHomePage from '@/components/cpHomePage/MainHomePage.jsx'
import HeaderHomePage from '@/components/cpMainNavigator/HeaderHomePage.jsx'
import React, { useEffect } from 'react'

const PageHome = () => {
    const userAccount = localStorage.getItem("userAccount") || "guest";  return (
    <div>
      <HeaderHomePage/>
      <MainHomePage userAccount = {userAccount}/>
    </div>
  )
}

export default PageHome
