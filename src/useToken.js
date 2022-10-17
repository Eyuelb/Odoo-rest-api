import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("user");
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken?.access_token);
  };
  //console.log("tokennn", token);

  return {
    setToken: saveToken,
    token,
  };
}
