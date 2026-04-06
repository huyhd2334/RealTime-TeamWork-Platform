import React, { useEffect, useState } from 'react'
import styles from '../homePage.module.css'
import { CircleUser, ClipboardList, LayoutDashboard, Settings, Users, Video } from 'lucide-react'
import UserProfile from './UserProfile'
import { toast } from 'sonner'

const MainSideBar = ({active, setActive, userAccount}) => {
  toast.success(active)
  return (
    <div className={`${styles.SideBar}`}>
      <div
        className={`${styles.sideBarOption} ${active === "dashboard" ? styles.activate : ""}`}
        onClick={() => setActive("dashboard")}
      >
        <LayoutDashboard size={30}/> <span> Dash Board</span>
      </div>

      <div
        className={`${styles.sideBarOption} ${active === "meeting" ? styles.activate : ""}`}
        onClick={() => setActive("meeting")}
      >
        <Video size={30}/> <span>Meeting</span>
      </div>

      <div
        className={`${styles.sideBarOption} ${active === "task" ? styles.activate : ""}`}
        onClick={() => setActive("task")}
      >
        <ClipboardList size={30}/> <span>Task</span>
      </div>

      <div
        className={`${styles.sideBarOption} ${active === "workspace" ? styles.activate : ""}`}
        onClick={() => setActive("workspace")}
      >
        <Users size={30}/> <span>WorkSpace</span>
      </div>

      <div
        className={`${styles.sideBarOption} ${active === "setting" ? styles.activate : ""}`}
        onClick={() => setActive("setting")}
      >
        <Settings size={30}/> <span>Setting</span>
      </div>

    <div className={`${styles.profileContainer} ${active === "user" ? styles.stars : ""}` } onClick={() => setActive("user")}>
       <div>
          <CircleUser size={36} />
       </div>
       <div className='flex flex-col'>
            <a className='text-lg font-semibold'>{userAccount.user_name}</a>
            <a className='text-sm'>Account: {userAccount.user_account}</a>
       </div>
    </div>
    </div>
  )
}

export default MainSideBar