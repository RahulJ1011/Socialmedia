import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Myprofile from "./pages/Myprofile";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/feed"
          element={token ? <Feed /> : <Navigate to={"/"} />}
        />
        <Route
          path="/post"
          element={token ? <Post /> : <Navigate to={"/"} />}
        />
        <Route path="/profile" element={<Myprofile />} />
      </Routes>
    </div>
  );
}

export default App;
