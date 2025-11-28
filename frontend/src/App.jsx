import {Toaster} from "sonner"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import PageLoginSignup from "./pages/PageLoginSignup.jsx"
import PageCreateRoom from "./pages/PageCreateRoom.jsx"
import PageRoom from "./pages/PageRoom.jsx"

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
        </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
