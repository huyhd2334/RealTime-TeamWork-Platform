import React, { useEffect } from 'react'
import styles from '../homePage.module.css'
import DashBoard from '../sideBar/DashBoard';
import Task from '../sideBar/Task';
import Meeting from '../sideBar/Meeting';
import WorkSpace from '../sideBar/WorkSpace.jsx';
import Setting from '../sideBar/Setting';

const CenterContentControler = ({ userAccount, active }) => {
  const renderContent = () => {
    switch (active) {
      case "meeting":
        return <Meeting />;
      case "task":
        return <Task />;
      case "workspace":
        return <WorkSpace userAccount={userAccount}/>;
      case "setting":
        return <Setting />;
      default:
        return <DashBoard userAccount={userAccount} />;
    }
  };

  return (
    <div className={styles.MainContent}>
      {renderContent()}
    </div>
  );
};

export default CenterContentControler;
