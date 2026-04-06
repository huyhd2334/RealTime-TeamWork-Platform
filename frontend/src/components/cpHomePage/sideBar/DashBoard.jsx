import React, { Activity } from 'react'
import styles from './subSideBar.module.css'
import { ActivityIcon, ClipboardCheck, Projector } from 'lucide-react'

const DashBoard = ({userAccount}) => {
  return (
    <div className='flex flex-col space-y-10'>
        <div className='flex flex-col justify-start items-start'>
            <a className={styles.headerTitle}> Welcome back, {userAccount.user_name} </a>
            <a className={styles.note}> Here's a snapshot of your project performance and operations today.</a>
        </div>
        
        {/* OverView */}
        <div className='flex flex-col'>
            <a className="text-3xl text-[#475569] font-semibold"> OverView</a>
            <a className={styles.note}>provides a quick summary of your current activities, including tasks, meetings, and recent updates.</a>
        </div>
        <div className='flex flex-row space-x-6'>
            <div className={styles.widget}>
                <div className={styles.widgetTitle}> <a>Tasks Summary</a> <ClipboardCheck/> </div>
                <a> Total 24 </a>
                <a> Completed 15 </a>
                <a> Overdue 2 </a>
            </div> 
            <div className={styles.widget}>
                <a className={styles.widgetTitle}> <a>Upcoming Meeting</a> <Projector /></a>
                <a> 10:00 Standup </a>
                <a> 13:30 Review </a>
                <a> 16:00 Client </a>
            </div> 
            <div className={styles.widget}>
                <a className={styles.widgetTitle}> <a>Activity Feed</a> <ActivityIcon /> </a>
                <a> 10:00 Standup </a>
                <a> 13:30 Review </a>
                <a> 16:00 Client </a>
            </div> 
        </div>
    </div>
  )
}

export default DashBoard
