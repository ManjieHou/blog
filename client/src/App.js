import React from "react";
import ReactDOM from 'react-dom';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MenuBar from "./components/MenuBar";
import Register from "./pages/Register";
import Post from "./pages/Post";

function App(){
  return (
    <div>
     <MenuBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );

}
  
export  default App;