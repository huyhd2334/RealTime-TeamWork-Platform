import React, { useEffect, useState } from 'react'
import styles from './homePage.module.css'
import { ClipboardList, LayoutDashboard, Settings, Users, Video } from 'lucide-react'
import UserProfile from './mainPages/UserProfile'
import { toast } from 'sonner'

const SideBar = ({active, setActive, userAccount}) => {
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
        className={`${styles.sideBarOption} ${active === "team" ? styles.activate : ""}`}
        onClick={() => setActive("team")}
      >
        <Users size={30}/> <span>Team</span>
      </div>

      <div
        className={`${styles.sideBarOption} ${active === "setting" ? styles.activate : ""}`}
        onClick={() => setActive("setting")}
      >
        <Settings size={30}/> <span>Setting</span>
      </div>
      <div onClick={() => setActive("user")}>
        <UserProfile
          userAccount={userAccount}
          className={active === "user" ? styles.stars : ""}
        />      
      </div>
    </div>
  )
}

export default SideBar