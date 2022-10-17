import React, { FC } from "react";
import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Link } from "react-router-dom";

const Sidebar  = () =>{
    return(
        <div className="sidebar">
            
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <span className="logo">CheMed Admin</span>
                </Link>
                
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                   <li>
                   <DashboardIcon className="icon"/>
                        <span>
                            Dashboard
                        </span>
                    </li>
                   </Link>
                   
                    </li>
                    <p className="title">LIST</p>
                    <li>
                        
                    <Link to="/user" style={{ textDecoration: "none" }}>
                   <li>
                    <Person2OutlinedIcon className="icon" />
                    <span>Users</span>
                    </li>
                   </Link>
                    </li>
                    <li>
                        <Inventory2OutlinedIcon className="icon"/>
                        <span>
                            Products
                        </span>
                    </li>
                    <li>
                    <CreditCardIcon className="icon" />
                        <span>
                            Orders
                        </span>
                    </li>
                    <li>
                    <DeliveryDiningOutlinedIcon className="icon"/>
                        <span>
                            Delivery
                        </span>
                    </li>
                    <p className="title">USEFUL</p>
                    <li>
                        <QueryStatsIcon className="icon"/>
                        <span>
                            stats
                        </span>
                    </li>
                    <li>
                        <NotificationsActiveIcon className="icon"/>
                        <span>
                            Notifications
                        </span>
                    </li>
                   <p className="title">SERVICE</p>
                    <li>
                        <SettingsIcon className="icon"/>
                        <span>
                            Setting
                        </span>
                    </li>
                    <p className="title">USER</p>
                    <li>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                   <li>
                   <AccountCircleIcon className="icon"/>
                        <span>
                            Profile
                        </span>
                    </li>
                   </Link>
                       
                    </li>
                    <li>
                        <LogoutIcon className="icon"/>
                        <span>
                            Logout
                        </span>
                    </li>
                    
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
            
        </div>
    
        )
   
}
   
export default Sidebar;