import { authapi,setUser,removeUser } from "@services";

export const registerService = (fullName,username,gender,phoneNo,email,password) => {
  return authapi.post("/createUserAccount", {
    fullName: fullName,
    userName: username,
    phoneNo: phoneNo,
    password: password
  });
};

export const loginService = (userName, loginCode) => {
  return authapi
    .post("/login", {
      userName,
      loginCode
    })
    .then((response) => {
      if (response.data.refresh_token) {
        setUser(response.data);
      }
      return response.data;
    }).catch((error) => {
      return error;
    })
};


export const logout = () => {
  return authapi
  .post(`/logout?userId=${encodeURIComponent(2)}`)
  .then((response) => {

  //  console.log({ data: response.data, status: response.status })
    if(response.status === 200){
      removeUser();
    }
    return { data: response.data, status: response.status }
  }).catch((error) => {

    //console.log(error.response)
    return { data: error.response.data, status: error.response.status };
  })
  
};
export const getUserInfofindByIdService = (id) => {
  return authapi
  .get(`/findById?id=${encodeURIComponent(id)}`)
  .then((response) => {

   // console.log({ data: response.data, status: response.status })
    return { data: response.data, status: response.status }
  }).catch((error) => {

    //console.log(error.response)
    return { data: error.response.data, status: error.response.status };
  })
  
};
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

