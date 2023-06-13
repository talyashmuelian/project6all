import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import Albums from "./pages/Albums";
import Todos from "./pages/Todos";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Info from "./pages/Info";
import Photos from "./pages/Photos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="Users" element={<Users />}>
          <Route path=":id/Posts" element={<Posts />} />
          <Route path=":id/Todos" element={<Todos />} />
          <Route path=":id/Albums" element={<Albums />}></Route>
          <Route path=":userId/Albums/:albumId/Photos" element={<Photos />} />
          <Route path=":id/Info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
