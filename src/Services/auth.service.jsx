import axios from "axios";

const API_URL = "http://localhost:8084/auth";

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

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
