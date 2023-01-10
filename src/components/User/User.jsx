import React, { FC, useState, useEffect } from "react";
import {
  PlusOutlined,
  DownOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./user.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import AdminTable from "../Table/Table";
import SearchBar from "../SearchBar/Searchbar";
import AuthService from "../../Services/auth.service";
import { Button, Drawer, Switch } from "@mui/material";
import MaterialTable from "material-table";
import { Table, Menu, Form, Input, Dropdown, Space, Select } from "antd";
import Modal from "react-modal";
import { render } from "@testing-library/react";

//import { Switch } from "antd";
const menu = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
  </Menu>
);
const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isUserActive, setIsUserActive] = useState(true);

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const fetchUsers = async (e) => {
    const response = await AuthService.getUsers();
    setUsers(response);
  };

  const filterUsersSync = (searchValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (searchValue === "") {
          return users;
        }
        return users.filter((filteredUsers) =>
          filteredUsers.fullName
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      }, 2000);
    });
  };

  const filterUsers = (searchValue) => {
    if (searchValue === "") {
      fetchUsers();
      return users;
    } else {
      return users.filter((filteredUsers) =>
        filteredUsers.fullName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  };

  const addUser = async (e) => {
    const response = await AuthService.addUsers(
      fullName,
      userName,
      phone,
      password,
      role
    );
    if (response) {
      window.alert("User Successfully Created");
    }
    fetchUsers();
    closeModal();
  };

  const activateAction = async (record) => {
    //setIsUserActive(!isUserActive);
    console.log("Button Checked", record.userId);
    const response = await AuthService.activateDeactivateUser(record.userId);
    if (response) {
      window.alert(response);
      console.log("Use Update Successfully");
      fetchUsers();
    }
  };
  const resetPassword = async (record) => {
    const response = await AuthService.resetUserPassword(
      record.userName,
      "123"
    );
    if (response) {
      window.alert("User Password reset Successfully");
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const switchButton = (userStatus) => {
    if (userStatus === "deactivated") return "Activate";
    else return "Deactivate";
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    { title: "ID", dataIndex: "userId" },
    { title: "Full Name", dataIndex: "fullName" },
    { title: "User Name", dataIndex: "userName" },
    { title: "Phone Number", dataIndex: "phone" },
    { title: "Role", dataIndex: "role" },
    { title: "Status", dataIndex: "userStatus" },
    {
      title: "Action",

      render: (record) => {
        return (
          <>
            <div className="w-30 m-0">
              {/* <div>
                <Space size="large">
                  <Dropdown>
                    <div>
                      <MoreOutlined />
                    </div>
                  </Dropdown>
                </Space>
              </div> */}

              {/* <Switch
                defaultChecked
                checkedChildren="Active"
                uncheckedChildren="Deactivate"
                onChange={toggleAction()}
                label="Activate"
              ></Switch> */}
              <button
                className="h-8 w-28 bg-transparent hover:bg-blue-500 text-blue hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => {
                  activateAction(record);
                }}
                style={{
                  textAlign: "center",

                  borderColor:
                    record.userStatus === "deactivated" ? "green" : "red",
                  color: record.userStatus === "deactivated" ? "green" : "red",
                }}
              >
                <div>{switchButton(record.userStatus)}</div>
              </button>

              <button
                className="h-8 ml-2 w-40 bg-transparent hover:bg-blue-500 text-blue hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => {
                  resetPassword(record);
                }}
              >
                <div>Reset Password</div>
              </button>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    console.log("Search Value Changed");
    // filterUsersSync(searchValue).then((fusers) => {
    //   setUsers(fusers);
    // });
    const filteredUsers = filterUsers(searchValue);
    setUsers(filteredUsers);
  }, [searchValue]);
  const formatData = users.map(
    ({ userId, fullName, userName, phone, role, userStatus }) => {
      return { userId, fullName, userName, phone, role, userStatus };
    }
  );

  //console.log("formated Data", formatData);
  return (
    <>
      <div className="user">
        <Sidebar></Sidebar>

        <div className="userContainer pr-2">
          <Navbar />
          {/* <h1 style={{}}>User Management</h1> */}
          <h6 class="font-medium text-center mt-4 leading-tight text-base  text-blue-600">
            User Management
          </h6>
          <div className="flex mr-3">
            <div className="m-auto ml-4">
              <SearchBar
                callback={(searchValue) => setSearchValue(searchValue)}
              />
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 ml-4 w-28 rounded-lg"
                onClick={openModal}
                icon={<PlusOutlined />}
                style={{ margin: "6px" }}
              >
                Add User
              </button>
            </div>
          </div>

          <div className="userTable">
            <AdminTable data={users} columns={columns} />
          </div>
          <div>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div>Add User</div>

              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={addUser}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <div className="flex p-">
                  <Form.Item
                    className="p-2"
                    label="Full Name"
                    name="fullname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Full Name!",
                      },
                    ]}
                  >
                    <Input
                      className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    className="p-2"
                    label="User Name"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="flex">
                  <Form.Item
                    className="p-2"
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input
                      className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    className="p-2"
                    label="Phone "
                    name="phone"
                    rules={[
                      { required: true, message: "Please input your phone!" },
                    ]}
                  >
                    <Input
                      className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="flex">
                  <Form.Item
                    className="p-2"
                    label="User Role"
                    name="role"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input user role!",
                    //   },
                    // ]}
                  >
                    <select
                      id="role"
                      onChange={(e) => setRole(e.target.value)}
                      style={{
                        width: 200,
                      }}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="finance">Finance</option>
                      <option value="callcenter">Call Center</option>
                      <option value="pharmacist">Pharmacist</option>
                    </select>
                  </Form.Item>
                  <Form.Item
                    className="p-2"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                </div>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" onClick={closeModal}>
                    cancel
                  </Button>
                  <Button type="primary" htmlType="submit" onSubmit={addUser}>
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
