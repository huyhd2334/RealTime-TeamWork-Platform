import React from 'react'
import styles from './homePage.module.css'
import { ClipboardList, LayoutDashboard, Settings, Users, Video } from 'lucide-react'

const SlideBar = () => {
  return (
    <div className={styles.SideBar}>
        <div className={styles.sideBarOption}>
            <LayoutDashboard size={30}/> <span>Dash Board</span>
        </div>
        <div className={styles.sideBarOption}>
            <Video size={30}/> <span>Metting</span>
        </div>
        <div className={styles.sideBarOption}>
            <ClipboardList size={30}/> <span>Task</span>
        </div>
        <div className={styles.sideBarOption}>
            <Users size={30}/> <span>Team</span>
        </div>
        <div className={styles.sideBarOption}>
            <Settings size={30}/> <span>Setting</span>
        </div>
    </div>
  )
}

export default SlideBar
