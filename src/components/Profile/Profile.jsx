import "./profile.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Modal } from "antd";
import { myImage } from "../../files/profile.PNG";
import authService from "../../Services/auth.service";
import { useEffect, useState } from "react";
import { Button, Form, Input, Radio } from "antd";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };

  const getUser = async (e) => {
    const currentUser = JSON.parse(localStorage.getItem("LogInUser"));
    const response = await authService.getUserById(currentUser.loggedInUserId);
    setCurrentUser(response);

    console.log("Current User", response);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleProfileEdit = (event) => {
    event.preventDefault();
    console.log("EditUser", userName);
    const userId = JSON.parse(localStorage.getItem("LogInUser")).loggedInUserId;

    const response = authService.profileEdit(
      userName,
      fullName,
      userId,
      currentUser,
      phone
    );
    if (response) {
      window.alert("Your Profile is Successfully Edited");
    }
  };
  const changePassword = async (event) => {
    const response = await authService.changePassword(
      userName,
      password,
      newPassword
    );
    if (response) {
      window.alert("Password Changed Successfully!");
    }
    console.log("Change Password", newPassword);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile">
      <Sidebar></Sidebar>

      <div className="profileContainer">
        <Navbar />
        <div className="flex">
          <div class="card">
            <div class="overlay d-none">
              <small class="fa fa-close"></small>
              <img src="https://imgur.com/SSCE2Uj.jpg" />
            </div>
            <div class="upperborder"></div>

            <div class="image items-center">
              <span className="items-center">
                <img id="userimage" src="https://imgur.com/SSCE2Uj.jpg" />
              </span>
            </div>
            <div class="text">
              <strong>{currentUser.fullName}</strong>
              <span>Role: CheMed Administrator</span>
              <span>Phone: {currentUser.phone}</span>
              <span>User Name: {currentUser.userName}</span>
              <span>User Status: {currentUser.userStatus}</span>
              {/* <h3>{currentUser.fullName}</h3>
              <h1>{currentUser.fullName}</h1>
              <p className="title">Role: CheMed Administrator</p>
              <p>Phone: {currentUser.phone}</p>
              <p>User Name: {currentUser.userName}</p>
              <p>User Status: {currentUser.userStatus}</p> */}
            </div>
          </div>
          {/* <div className="profileView">
            <img
              src="../../files/profile.PNG"
              alt="John"
              style={{ width: "100%" }}
            />
            <h1>{currentUser.fullName}</h1>
            <p className="title">Role: CheMed Administrator</p>
            <p>Phone: {currentUser.phone}</p>
            <p>User Name: {currentUser.userName}</p>
            <p>User Status: {currentUser.userStatus}</p>
          </div> */}
          <div className="profileEdit flex">
            {/* <form >
              <div className="m-4 float-left">
                <label>
                  Full Name:
                  <input
                    type="text"
                    name="fullname"
                    defaultValue={currentUser.fullName}
                  />
                </label>
              </div>

              <br />
              <div className="m-4 float-left">
                <label>
                  User Name:
                  <input
                    type="text"
                    name="username"
                    defaultValue={currentUser.userName}
                  />
                </label>
              </div>
              <br />
              <div className="m-4 float-left">
                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="phonenumber"
                    defaultValue={currentUser.phone}
                  />
                </label>
              </div>
              <div className="m-4 float-left">
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    defaultValue="example@gmail.com"
                  />
                </label>
              </div>
              <div className="m-4 float-right">
                <input
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                />
              </div>
            </form> */}
            <form class="w-full max-w-sm" onSubmit={handleProfileEdit}>
              <h1 className="m-4">Edit Profile</h1>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    Full Name
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    defaultValue={currentUser.fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-password"
                  >
                    User Name
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-password"
                    type="text"
                    defaultValue={currentUser.userName}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    Phone Number
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    defaultValue={currentUser.phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    Email
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    defaultValue="example@gmail.com"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Edit User
                  </button>
                </div>
              </div>
            </form>
            <div>
              <form class="w-full max-w-sm" onSubmit={changePassword}>
                <h1 className="m-4">Edit Profile</h1>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label
                      class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      for="inline-password"
                    >
                      Old Password
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-password"
                      type="password"
                      placeholder="******************"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label
                      class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      for="inline-password"
                    >
                      New Password
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-password"
                      type="password"
                      placeholder="******************"
                      onChange={(event) => setNewPassword(event.target.value)}
                    />
                  </div>
                </div>

                <div class="md:flex md:items-center">
                  <div class="md:w-1/3"></div>
                  <div class="md:w-2/3">
                    <button
                      class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div>
              <Modal></Modal>
            </div>
          </div>

          {/* <div class="items-center" style={{}}>
            <Avatar size={200} icon={<UserOutlined />} />
          </div> 
          <Avatar size={200} icon={<UserOutlined />} />
          <img src="img.jpg" alt="John" style={{ width: "100%" }} />
          <h1>John Doe</h1>
          <p className="title">CEO &amp; Founder, Example</p>
          <p>Harvard University</p> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
