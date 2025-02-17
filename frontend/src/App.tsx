
import Navbar from "./components/Navbar"
import PasswordChange from "./components/PasswordChange"
import PostCreate from "./components/posts-management/PostCreate"
import PostDetail from "./components/posts-management/PostDetail"
import PostUpdate from "./components/posts-management/PostUpdate"
import Home from "./pages/Home"
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
        <Route path="/post/:postId" element={<PostDetail/>}/>
        <Route path="/post/create" element={<PostCreate/>}/>
        <Route path="/post/update/:postId" element={<PostUpdate/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App
