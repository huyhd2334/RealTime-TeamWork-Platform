import React from 'react'
import styles from './mainNavigator.module.css'
import { Plus, Search, Zap } from 'lucide-react'
const HeaderHomePage = () => {
  return (
    <div className={`${styles.mainNavigator}`}>
      <div className='flex flex-row space-x-4 justify-center items-center'>
       <div className={`${styles.user}`}>
          <Zap className='w-10 h-10 text-blue-700'/> <a>TECHFLOW</a>
       </div> 
       <div className={`${styles.sologan}`}>
          <a>WELLCOME BACK, QUOCHUY</a>
          <a className='text-sm font-medium'>You have 4 task to wrap up today</a>
       </div>
    </div>
    <div className='flex flex-row space-x-4 justify-center items-center'>
       <div className={`${styles.search}`}>
          <Search /> <a>type something .. </a>
       </div>
       <div className={`${styles.button}`}>
            <Plus /> <a> New Project </a>
       </div>
    </div>
    </div>
  )
}

export default HeaderHomePage
