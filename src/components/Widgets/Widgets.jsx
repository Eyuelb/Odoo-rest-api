import "./widgets.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AuthService from "../../Services/auth.service";
import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Widgets = ({ type }) => {
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState();
  const [prescriptions, setPrescriptions] = useState();
  let data;
  const fetchUsers = async (e) => {
    const response = await AuthService.getUsers();
    setUsers(response.length);
    console.log("Lenght", users);
    return response.length;
  };
  const fetchOrders = async (e) => {
    const response = await AuthService.getOrders();
    setOrders(response.length);
  };
  const fetchPrescriptions = async (e) => {
    const response = await AuthService.getPrescriptions();
    setPrescriptions(response.length);
  };
  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchPrescriptions();
  }, []);
  //const amount = 100;
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        amount: users,
        isMoney: false,
        link: (
          <Link to="/user" style={{ textDecoration: "none" }}>
            View All Users
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        amount: orders,
        isMoney: false,
        link: (
          <Link to="/orders" style={{ textDecoration: "none" }}>
            View All Orders
          </Link>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "prescription":
      data = {
        title: "PRESCRIPTIONS",
        amount: prescriptions,
        isMoney: false,
        link: (
          <Link to="/prescriptions" style={{ textDecoration: "none" }}>
            View All Prescriptions
          </Link>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        amount: 200,
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title} </span>
        <span className="counter">
          {data.isMoney && "birr"} {data.amount}{" "}
        </span>
        <span className="link">{data.link} </span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widgets;
