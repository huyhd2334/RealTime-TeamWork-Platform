import styles from './homePage.module.css'
import MainContent from './MainContent.jsx'
import RightPanel from './RightPanel.jsx'
import SlideBar from './SlideBar.jsx'

const MainHomePage = () => {
  return (
    <div className={styles.layOut}>
        <SlideBar/>
        <MainContent/>
        <RightPanel/>
    </div>
  )
}

export default MainHomePage
