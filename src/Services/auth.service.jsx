import axios from "axios";

const API_URL = "http://localhost:8084/auth";
const API_URL_USER = "http://localhost:8084/users";
const API_URL_PRODUCT = "http://localhost:8083/product";
const API_URL_ORDER = "http://localhost:8083/order";

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

const getUserById = (usrId) => {
  return axios
    .get(API_URL + "/findById?id=" + usrId)
    .then((response) => {
      //console.log("Current User==", response.data);
      return response.data;
    })
    .catch(() => {
      console.log("failed to get a user");
    });
};

//const updateUser =()

const getProducts = () => {
  return axios
    .get(API_URL_PRODUCT + "/ListAllforOdoo")
    .then((response) => {
      if (response) {
        console.log("======Products======");
        console.log(response.data);
        return response.data;
      }
    })
    .catch((err) => {
      console.log("can't fetch products");
    });
};

const getOrders = () => {
  return axios
    .get(API_URL_ORDER + "/listAll")
    .then((response) => {
      if (response) {
        console.log("=========Orders=========");
        console.log(response.data);
        return response.data;
      }
    })
    .catch(() => {
      console.log("can't fetch orders");
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

const changePassword = (userName, oldPassword, newPassword) => {
  return axios
    .put(API_URL + "/changePassword", {
      userName,
      oldPassword,
      newPassword,
    })
    .then((response) => {
      console.log("password Changed", response.data.msg);
    })
    .catch(() => {
      console.log("can't change Password");
    });
};

const activateDeactivateUser = (userId) => {
  console.log("UserIDDDDD", userId);
  return axios
    .put(API_URL + "/activate_deactivate?userId=" + userId)
    .then((response) => {
      console.log("User Status Changed Successfully");
      return response.msg;
    })
    .catch((err) => {
      console.log("can't update");
    });
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  getUsers,
  addUsers,
  activateDeactivateUser,
  getProducts,
  getOrders,
  getUserById,
};

export default authService;
