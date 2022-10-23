import React, { FC, useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./user.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import AdminTable from "../Table/Table";
import AuthService from "../../Services/auth.service";
import { Button, Drawer, Space } from "@mui/material";
import MaterialTable from "material-table";
import { Table, Form, Input } from "antd";
import Modal from "react-modal";

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
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const fetchUsers = async (e) => {
    const response = await AuthService.getUsers();
    setUsers(response);
  };
  const addUser = async (e) => {
    const response = await AuthService.addUsers(
      fullName,
      userName,
      phone,
      password
    );
    if (response) {
      window.alert("User Successfully Created");
    }
    closeModal();
  };
  console.log("users", users);

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
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatData = users.map(
    ({ userId, fullName, userName, phone, role, userStatus }) => {
      return { userId, fullName, userName, phone, role, userStatus };
    }
  );

  console.log("formated Data", formatData);
  return (
    <>
      <div className="user">
        <Sidebar></Sidebar>

        <div className="userContainer pr-2">
          <Navbar />
          User Management
          <div className="mb-10 pr-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={openModal}
              icon={<PlusOutlined />}
              style={{ float: "right", margin: "6px" }}
            >
              Add User
            </button>
          </div>
          <div className="userTable">
            {/* <tbody  >
 <tr className="tableheader">
    <th>ID</th>
    <th>Full Name</th>
    <th>User Name</th>
    <th>Phone Number</th>
    <th>Role</th>
    <th>Action</th>
 </tr>
{users.map((item, index) => (
<tr key={index}>
<td>{item.userId}</td>
<td>{item.fullName}</td>
<td>{item.userName}</td>
<td>{item.phone}</td>
<td>{item.role}</td>
<td>Active</td>
</tr>
))}
</tbody> */}

            <AdminTable data={formatData} columns={columns} />
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
