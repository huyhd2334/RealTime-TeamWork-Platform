import { useState } from 'react'
import styles from './homePage.module.css'
import MainContent from './MainContent.jsx'
import RightPanel from './RightPanel.jsx'
import SideBar from './SideBar.jsx'

const MainHomePage = ({userAccount}) => {
  const [active, setActive] = useState("dashboard")
  return (
    <div className={`${styles.layOut} ${active === "dashboard" ? "" : styles.expandMain}`}>
        <SideBar active={active} setActive={setActive} userAccount = {userAccount}/>
        <MainContent userAccount = {userAccount} active = {active}/>
        <RightPanel/>
    </div>
  )
}

export default MainHomePage
