import axios from "axios";

const API_URL = "http://localhost:8084/auth";
const API_URL_USER = "http://localhost:8084/users";

const signup = (userName, loginCode) => {
  return axios
    .post(API_URL + "/signup", {
      userName,
      loginCode,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (userName, loginCode) => {
  return axios
    .post(API_URL + "/login", {
      userName,
      loginCode,
    })

    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getUsers = () => {
  return axios
    .get(API_URL_USER + "/getUsersDetailByStatus")
    .then((response) => {
      if (response) {
        localStorage.setItem("user", JSON.stringify(response.data.model));
      }
      console.log("=================fetch==============");
      return response.data.model;
    })
    .catch((err) => {
      console.log("can't fetch");
    });
};
const addUsers = (fullName, userName, phone, password) => {
  return axios
    .post(API_URL + "/createUser", {
      fullName,
      userName,
      phone,
      password,
    })
    .then((response) => {
      console.log("User saved", response.data.msg);
      return response.data.msg;
    })
    .catch((err) => {
      console.log("can't save a user");
    });
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  getUsers,
  addUsers,
};

export default authService;
