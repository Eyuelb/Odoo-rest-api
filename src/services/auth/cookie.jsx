

export const getCookiesRefreshToken = () => {

    return ''
  };
  
  export const getCookiesAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  };