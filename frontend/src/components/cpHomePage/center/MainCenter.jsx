import { useState } from 'react'
import styles from '../homePage.module.css'
import MainContent from './CenterContentControler.jsx'
import RightPanel from '../rightPanel/MainRightPanel.jsx'
import SideBar from '../sideBar/MainSideBar.jsx'

const MainCenter = ({userAccount}) => {
  const [active, setActive] = useState("dashboard")
  return (
    <div className={`${styles.layOut} ${active === "dashboard" ? "" : styles.expandMain}`}>
        <SideBar active={active} setActive={setActive} userAccount = {userAccount}/>
        <MainContent userAccount = {userAccount} active = {active}/>
        <RightPanel/>
    </div>
  )
}

export default MainCenter
