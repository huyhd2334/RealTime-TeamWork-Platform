import {Toaster} from "sonner"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import PageLoginSignup from "./pages/pageLoginSignup.jsx"
import PageCreateRoom from "./pages/pageCreateRoom.jsx"
import PageRoom from "./pages/PageRoom.jsx"
import PageHome from "./pages/pageHome.jsx"

function App() {
  return (
    <>
    <Toaster richColors/>
    <BrowserRouter>
        <Routes>
          <Route
              path = "/"
              element = {<PageLoginSignup/>} 
              />
          <Route
              path = "/createroom"
              element = {<PageCreateRoom/>} 
              />
          <Route
              path = "/liveroom"
              element = {<PageRoom/>} 
              />
          <Route
              path = "/homepage"
              element = {<PageHome/>}
              />
        </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
