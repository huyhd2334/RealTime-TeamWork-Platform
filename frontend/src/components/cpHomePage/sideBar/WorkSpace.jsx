import React from 'react'
import styles from './subSideBar.module.css'

const WorkSpace = ({userAccount}) => {
  return (
    <div>
       <div className={styles.headerContainer}>
           <a className={styles.headerTitle}>Work Space</a>
           <a className={styles.note}>{userAccount.user_name}</a>
       </div>
    </div>
  )
}

export default WorkSpace
