import axios from "axios";

//const API_URL = "http://localhost:8084/auth";
const API_URL = process.env.REACT_APP_API_USER + "auth";
const API_URL_USER = process.env.REACT_APP_API_USER + "users";
const API_URL_PRODUCT = process.env.REACT_APP_PRODUCT + "product";
const API_URL_ORDER = process.env.REACT_APP_PRODUCT + "order";
const API_ORL_PRESCRIPTION = process.env.REACT_APP_PRESCRIPTION + "requestType";

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
        localStorage.setItem("LogInUser", JSON.stringify(response.data));
      }
      console.log("Log IN", response.data);
      return response.data;
    });
};

const logout = (userId) => {
  return axios
    .post(API_URL + "/logout?userId=" + userId)
    .then((response) => {
      if (response) {
        localStorage.removeItem("LogInUser");
        console.log("Successfully Logout");
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log("can't logout");
    });
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
    .get(API_URL_PRODUCT + "/productListAll")
    .then((response) => {
      if (response) {
        console.log("======Products======");
        console.log(response.data);
        return response.data;
      }
    })
    .catch((err) => {
      console.log("can't fetch products from Odoo");
    });
};

const getProductsFromDB = () => {
  return axios
    .get(API_URL_PRODUCT + "/productListAll")
    .then((response) => {
      if (response) {
        console.log("=======Products From DB========");
        console.log(response.data);
        return response.data;
      }
    })
    .catch(() => {
      console.log("can't fetch products from Database");
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

const getPrescriptions = () => {
  return axios
    .get(API_ORL_PRESCRIPTION + "/listAll")
    .then((response) => {
      if (response) {
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

const createOrder = (orderedProduct) => {
  return axios
    .post(API_URL_ORDER + "/createOrder", {
      userId: 2,
      location: 58,
      orderedProduct: orderedProduct,
    })
    .then((response) => {
      console.log("Order Successfully Created ");
      return response.data.msg;
    })
    .catch(() => {
      console.log("Order can't created successfully");
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

const approvePrescription = (prescriptionId) => {
  return axios
    .put(API_ORL_PRESCRIPTION + "/Approve?id=" + prescriptionId)
    .then((response) => {
      return response;
    })
    .catch(() => {
      console.log("Can't Approve Prescription");
    });
};
const declinePrescription = (prescriptionId) => {
  return axios
    .put(API_ORL_PRESCRIPTION + "/decline?id=" + prescriptionId)
    .then((response) => {
      return response;
    })
    .catch(() => {
      console.log("Can't Approve Prescription");
    });
};

const getPrescriptionById = (prescriptionId) => {
  return axios
    .get(API_ORL_PRESCRIPTION + "/findById?id=" + prescriptionId)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log("can't get prescription by Id");
    });
};

const orderProducts = (userId, location, promoCodeId, orderedProduct) => {
  return axios
    .get(API_URL_ORDER + "/createOrder")
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log("can't create Order");
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
  getProductsFromDB,
  createOrder,
  getPrescriptions,
  getPrescriptionById,
  approvePrescription,
  declinePrescription,
};

export default authService;
