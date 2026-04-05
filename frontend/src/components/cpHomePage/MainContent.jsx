import React, { useEffect } from 'react'
import styles from './homePage.module.css'
import DashBoard from './mainPages/DashBoard';
import Task from './mainPages/Task';
import Meeting from './mainPages/Meeting';
import Team from './mainPages/Team';
import Setting from './mainPages/Setting';

const MainContent = ({ userAccount, active }) => {
  const renderContent = () => {
    switch (active) {
      case "meeting":
        return <Meeting />;
      case "task":
        return <Task />;
      case "team":
        return <Team />;
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

export default MainContent;
