import { api,setUser,removeUser } from "@services";

export const registerService = (username, email, password) => {
  return api.post("/auth/signup", {
    username,
    email,
    password
  });
};

export const loginService = (phonenumber, password) => {
  return api
    .post("/auth/signin", {
      phonenumber,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        setUser(response.data);
      }

      return response.data;
    });
};
export const loginWithGoogleService = (accessKey) => {
  return api
    .post("/auth/loginWithGoogle",{
      refreshToken:accessKey
    })
    .then((response) => {
      if (response.data.accessToken) {
        setUser(response.data);
      }

      return response.data;
    });
};
export const testToken = () => {
  return api
    .get("/test/admin")
    .then((response) => {
      //console.log(response)
      // if (response.data.accessToken) {
      //   setUser(response.data);
      // }

      return response.data;
    });
};
export const logout = () => {
  removeUser();
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

