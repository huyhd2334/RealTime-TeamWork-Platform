import React from 'react'
import styles from '../homePage.module.css'
import { CircleUser } from 'lucide-react'

const UserProfile = ({userAccount, className}) => {
  return (
    <div className={`${styles.profileContainer} ${className}`}>
       {/* avatar */}
       <div>
          <CircleUser size={36} />
       </div>
       {/* user name */}
       <div className='flex flex-col'>
            <a className='text-lg font-semibold'>{userAccount.user_name}</a>
            <a className='text-sm'>Account: {userAccount.user_account}</a>
       </div>
    </div>
  )
}

export default UserProfile
