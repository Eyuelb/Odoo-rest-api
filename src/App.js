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
import Orders from "./components/Orders/Orders";
import Prescriptions from "./components/Prescriptions/Prescriptions";
import PrescriptionDetail from "./components/Prescriptions/PrescriptionDetail";
function App() {
  const [token, setToken] = useState([]);
  // const { token, setToken } = useToken();

  // console.log("TOkennnn===", localStorage.getItem("LogInUser"));
  // setToken(localStorage.getItem("LogInUser"));
  // console.log("TOkennnn++++", token);

  if (!localStorage.getItem("LogInUser")) {
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
            <Route path="orders" element={<Orders />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="prescriptionDetail" element={<PrescriptionDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
