import CommentCreate from "./components/Comment"
import Navbar from "./components/Navbar"
import PasswordChange from "./components/PasswordChange"
import PostCreate from "./components/PostCreate"
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
        <Route path="/post/create" element={<PostCreate/>}/>
        <Route path="/post/:postId/comment/create" element={<CommentCreate/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App
