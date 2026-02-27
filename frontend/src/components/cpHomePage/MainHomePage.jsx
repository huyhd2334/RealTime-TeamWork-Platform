import { useState } from 'react'
import styles from './homePage.module.css'
import MainContent from './MainContent.jsx'
import RightPanel from './RightPanel.jsx'
import SideBar from './SideBar.jsx'

const MainHomePage = () => {
  const [active, setActive] = useState("dashboard")
  return (
    <div className={`${styles.layOut} ${active === "dashboard" ? "" : styles.expandMain}`}>
        <SideBar active={active} setActive={setActive}/>
        <MainContent/>
        <RightPanel/>
    </div>
  )
}

export default MainHomePage
