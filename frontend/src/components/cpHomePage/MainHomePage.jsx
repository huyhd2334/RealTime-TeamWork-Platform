import styles from './homePage.module.css'
import MainContent from './MainContent.jsx'
import RightPanel from './RightPanel.jsx'
import SideBar from './SideBar.jsx'

const MainHomePage = () => {
  return (
    <div className={styles.layOut}>
        <SideBar/>
        <MainContent/>
        <RightPanel/>
    </div>
  )
}

export default MainHomePage
