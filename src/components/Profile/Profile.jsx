import "./profile.scss"
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";


const Profile =()=> {
  return (
    <div className="profile">
         <Sidebar></Sidebar>
         <div className="profileContainer">
            <Navbar/>
         </div>
        </div>
  )
}

export default Profile;