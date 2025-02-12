import Navbar from "./components/Navbar"
import { PostList } from "./components/posts"
import Home from "./pages/home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/profile/:id" element={<Home/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App
