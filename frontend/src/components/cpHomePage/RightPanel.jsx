import React from 'react'
import styles from './homePage.module.css'

const RightPanel = () => {
  return (
    <div className={styles.RightPanel}>
      <span className='text-2xl text-white font-bold'> Message </span>
      <div className={styles.chatContainer}>
          <div className={styles.friendChat}>
            <a> Quoc Huy</a>
            <a className={styles.chat}> mess: alo alo .... </a>
          </div>
          <div className={styles.friendChat}>
            <a> Cly </a>
            <a className={styles.chat}> mess: alo alo .... </a>
          </div>
          <div className={styles.friendChat}>
            <a> Quoc </a>
            <a className={styles.chat}> mess: alo alo .... </a>
          </div>
      <span className='text-2xl text-white font-bold'> Group Message </span>
          <div className={styles.friendChat}>
            <a> Project A  </a>
            <a className={styles.chat}> mess: alo alo .... </a>
          </div>
          <div className={styles.friendChat}>
            <a> Team 2 </a>
            <a className={styles.chat}> mess: alo alo .... </a>
          </div>
      </div>
    </div>
  )
}

export default RightPanel
