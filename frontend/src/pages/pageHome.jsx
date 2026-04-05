import MainHomePage from '@/components/cpHomePage/MainHomePage.jsx'
import HeaderHomePage from '@/components/cpMainNavigator/HeaderHomePage.jsx'
import React, { useEffect } from 'react'

const PageHome = () => {
  const str = localStorage.getItem("userAccount") || JSON.stringify({name: "guest"});
  const userAccount = JSON.parse(str);
  console.log(userAccount)
  return (
    <div>
      <HeaderHomePage/>
      <MainHomePage userAccount = {userAccount}/>
    </div>
  )
}

export default PageHome
