import { api} from "@services";

export const refreshTokenService = (token) => {
  return api.post("/auth/refreshtoken", {
    refreshToken: token
  }).then((response) => {
    return response;
  });
};
export const getLocalRefreshToken = () => {
  const {state} = JSON.parse(localStorage.getItem("user-data-storage"));
  return state.user?.refreshToken;
};

export const getLocalAccessToken = () => {
  const {state} = JSON.parse(localStorage.getItem("user-data-storage"));

  return state.user?.accessToken;
};

export const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const setUser = (user) => {
//  console.log(JSON.stringify(user));
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};


