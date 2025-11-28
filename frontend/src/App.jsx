import {Toaster} from "sonner"
import {BrowserRouter, Routes, Route} from "react-router"
import PageLoginSignup from "./pages/pageLoginSignup.jsx"
import PageCreateRoom from "./pages/pageCreateRoom.jsx"

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
        </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
