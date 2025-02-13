import Navbar from "./components/Navbar"
import PasswordChange from "./components/PasswordChange"
import Home from "./pages/home"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/profile/:id/change-password" element={<PasswordChange/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App
