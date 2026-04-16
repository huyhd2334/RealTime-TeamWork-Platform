import React, { Activity } from 'react'
import styles from './subSideBar.module.css'
import { ActivityIcon, ClipboardCheck, Projector } from 'lucide-react'

const DashBoard = ({userAccount}) => {
  return (
    <div className='flex flex-col space-y-10'>
        <div className='flex flex-col justify-start items-start'>
            <h1 className={styles.headerTitle}> Welcome back, {userAccount.user_name} </h1>
            <h1 className={styles.note}> Here's a snapshot of your project performance and operations today.</h1>
        </div>
        
        {/* OverView */}
        <div className='flex flex-col'>
            <h1 className="text-3xl text-[#475569] font-semibold"> OverView</h1>
            <h1 className={styles.note}>provides a quick summary of your current activities, including tasks, meetings, and recent updates.</h1>
        </div>
        <div className='flex flex-row space-x-6'>
            <div className={styles.widget}>
                <div className={styles.widgetTitle}> <a>Tasks Summary</a> <ClipboardCheck/> </div>
                <span> Total 24 </span>
                <span> Completed 15 </span>
                <span> Overdue 2 </span>
            </div> 
            <div className={styles.widget}>
                <span className={styles.widgetTitle}> <span>Upcoming Meeting</span> <Projector /></span>
                <span> 10:00 Standup </span>
                <span> 13:30 Review </span>
                <span> 16:00 Client </span>
            </div> 
            <div className={styles.widget}>
                <span className={styles.widgetTitle}> <span>Activity Feed</span> <ActivityIcon /> </span>
                <span> 10:00 Standup </span>
                <span> 13:30 Review </span>
                <span> 16:00 Client </span>
            </div> 
        </div>
    </div>
  )
}

export default DashBoard
