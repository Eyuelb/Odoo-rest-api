import React, { FC } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./dashboard.scss";
import Widgets from "../Widgets/Widgets";



const Dashboard  = () =>{
    return(
        <div className="dashboard">
               <Sidebar></Sidebar>
            <div className="homeContainer">
                <Navbar/>
                <div className="widgets">
                    <Widgets type="user"/>
                    <Widgets type="order"/>
                    <Widgets type="prescription"/>
                    <Widgets type="earning"/>
                   
                </div>
                </div>
        </div>
    
        
           
        )
   
}
   
export default Dashboard;
