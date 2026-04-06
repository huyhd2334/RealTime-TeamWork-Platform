import {Toaster} from "sonner"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import PageLoginSignup from "./pages/pageLoginSignup.jsx"
import PageHome from "./pages/pageHome.jsx"
import { AuthProvider } from "./context/AuthContext.jsx" 
import ProtectedRoute from "./routes/ProtectedRoute.jsx" 
import GuestRoute from "./routes/GuestRoute.jsx" 

function App() {
  return (
    <>
    <Toaster richColors/>
    <AuthProvider>
        <BrowserRouter>
            <Routes>
            <Route
                path = "/"
                element = { <GuestRoute>
                            <PageLoginSignup/>
                            </GuestRoute>}/>
            <Route
                path = "/homepage"
                element = {<ProtectedRoute>
                            <PageHome/>
                            </ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
    </>
  )
}
export default App
