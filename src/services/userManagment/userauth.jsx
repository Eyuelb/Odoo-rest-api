import { authapi,setUser,removeUser } from "@services";

export const registerService = async (fullName,username,gender,phoneNo,email,password) => {
  try{
    const response = await authapi.post("/createUserAccount", {
      fullName: fullName,
      userName: username,
      phoneNo: phoneNo,
      password: password
    })
    return response
  }
  catch(error){
    return error.response;
  }
};

export const loginService = async (userName, loginCode) => {

    try{
      const response = await authapi.post("/login", {
        userName,
        loginCode
      })
      return response
    }
    catch(error){
      return error;
    }
};


export const logout = async (id) => {
  try{
    const response = await authapi.post(`/logout?userId=${encodeURIComponent(id)}`)
    return response
  }
  catch(error){
    return error.response;
  }

};
export const getUserInfofindByIdService = async (id) => {

  try{
    const response = await authapi.get(`/findById?id=${encodeURIComponent(id)}`)
    return response
  }
  catch(error){
    return error.response;
  }
  
};
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

