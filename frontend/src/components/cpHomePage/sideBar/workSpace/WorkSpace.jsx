import React, { useEffect, useState } from 'react'
import styles from '../subSideBar.module.css'
import { useWorkSpace } from '@/hooks/useWorkSpace'
import CreateWSInterFace from './CreateWSInterFace.jsx'

const WorkSpace = ({userAccount}) => {
  const[content, setContent] = useState([])
  const {getUserWorkSpace, loading} = useWorkSpace()
  const[create, setCreate] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserWorkSpace()
      setContent(data || [])
    }
    fetchData()
  }, [])
  
  return (
    <div className='flex flex-col space-y-6'>
       <div className={styles.headerContainer}>
           <div className='space-x-4'>
              <span className={styles.headerTitle}>Your Work Spaces</span>
              <div className={styles.button} onClick={() => {setCreate(pre => !pre)}}> {create ? "Cancel Process" : "+ New WorkSpace"} </div>
           </div>
           <span className={styles.headerText}> OverView </span>
       </div>

       <div className={styles.mainContainer}>
        {create?(
          <CreateWSInterFace/>
        ):(
          (loading?(
            <p>Loading...</p>
            ):(content.length != 0 ? (
              content.map((ws, idx) => (
                <div key={ws.workspace_id} className={styles.widget} >
                    <h1 className={`text-3xl font-semibold ${styles.highlightTitle}`}> Work Space {idx+1} </h1>
                    <span className={`${styles.widgetTitle} ${styles.highlight}`}> Name: {ws.workspace_name} </span>
                    <span className={`${styles.highlight}`}> ID {ws.workspace_id} </span>
                    <span className={`${styles.highlight}`}> Role {ws.role} </span>
                </div>
              ))
            ) : (
            <p>No workspace</p>
          )))
        )}
       </div>
    </div>
  )
}

export default WorkSpace
