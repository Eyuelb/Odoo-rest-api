import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Login from "./components/Login/Login";
import useToken from "./useToken";
import { useState, useEffect } from "react";
import AuthService from "../src/Services/auth.service";
import User from "./components/User/User";
import Profile from "./components/Profile/Profile";
import Products from "./components/Products/Products";

function App() {
  const [token, setToken] = useState();
  // const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="profile" element={<Profile />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
