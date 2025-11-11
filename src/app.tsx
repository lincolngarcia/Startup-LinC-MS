import { BrowserRouter, Routes, Route } from "react-router-dom";
import Slug from "./slug"
import Admin from "./admin/admin"
import Login from "./login"
import { useState } from "react";

export default function App() {
  const [auth, setAuth] = useState(false)

  return (
    <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/admin/*" element={<Admin authentication={[auth, setAuth]} />} />
            <Route path="*" element={<Slug />} />
        </Routes>
    </BrowserRouter>
  );
}

/* NavLink for switching tabs */
