import { BrowserRouter, Routes, Route } from "react-router-dom";
import Slug from "./slug"
import Admin from "./admin/admin"
import Login from "./login"
import { useState } from "react";

export default function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="*" element={<Slug />} />
        </Routes>
    </BrowserRouter>
  );
}

/* NavLink for switching tabs */
