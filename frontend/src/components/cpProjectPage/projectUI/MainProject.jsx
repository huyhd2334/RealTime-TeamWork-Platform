import React from 'react'
import styles from './projectUI.module.css'
const MainProject = ({id}) => {
  
  return (
    <div className={styles.mainProject}>
      <h1 className={styles.title}> WorkSpace ID: {id} </h1>
    </div>
  )
}

export default MainProject
