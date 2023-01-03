import React, { FC } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./dashboard.scss";
import Widgets from "../Widgets/Widgets";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const Dashboard = () => {
  console.log("URL==>", window.location.pathname);
  return (
    <div className="dashboard">
      <div className="breadcrumb"></div>
      <Sidebar></Sidebar>
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widgets type="user" />
          <Widgets type="order" />
          <Widgets type="prescription" />
          <Widgets type="earning" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
