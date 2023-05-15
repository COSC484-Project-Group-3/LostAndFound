import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Map from "./pages/Map";
import Settings from "./pages/Settings";
import Post from "./pages/Post";
import About from "./pages/About";
import ChangePassword from "./pages/ChangePassword";
import { Switch } from "@mui/material";
import NotFound from "./pages/NotFound";
import UpdatePost from "./pages/UpdatePost";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/settings" element={<Settings/>}></Route>
        <Route path="/post" element={<Post/>}></Route>
        <Route path="/changePassword" element={<ChangePassword/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/updatepost" element={<UpdatePost/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
