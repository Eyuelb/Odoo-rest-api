import React, { FC } from "react";
import "./user.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";



const User  = () =>{
    return(
        <div className="user">
         <Sidebar></Sidebar>
         <div className="userContainer">
            <Navbar/>
         </div>
        </div>
    
        )
   
}
   
export default User;
