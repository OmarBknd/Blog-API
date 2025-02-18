
import Navbar from "./components/Navbar"
import PasswordChange from "./components/PasswordChange"
import PostCreate from "./components/posts-management/PostCreate"
import PostDetail from "./components/posts-management/PostDetail"
import PostUpdate from "./components/posts-management/PostUpdate"
import AdminIndex from "./pages/admin/AdminIndex"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AdminComments from "./pages/admin/AdminComments"
import AdminPosts from "./pages/admin/AdminPosts"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute"


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route element={<AdminProtectedRoute/>} >
           <Route path="/admin-dashboard" element={<AdminIndex/>} />
           <Route path="/admin-dashboard/users" element={<AdminUsers/>} />
           <Route path="/admin-dashboard/posts" element={<AdminPosts/>} />
           <Route path="/admin-dashboard/comments" element={<AdminComments/>} />
           </Route>

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
