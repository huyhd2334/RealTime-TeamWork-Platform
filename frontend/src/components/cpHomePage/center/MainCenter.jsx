import { useState } from 'react'
import styles from '../homePage.module.css'
import MainContent from './CenterContentControler.jsx'
import RightPanel from '../rightPanel/MainRightPanel.jsx'
import SideBar from '../sideBar/MainSideBar.jsx'
import { useUIContext } from '@/context/UIContext.jsx'

const MainCenter = ({userAccount}) => {
  const {setOption, option} = useUIContext()
  return (
    <div className={`${styles.layOut} ${option === "dashboard" ? "" : styles.expandMain}`}>
        <SideBar userAccount = {userAccount}/>
        <MainContent userAccount = {userAccount}/>
        <RightPanel/>
    </div>
  )
}

export default MainCenter
