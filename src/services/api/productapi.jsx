import axios from "axios";
import { getLocalAccessToken, getLocalRefreshToken} from "@services";
import { setTokenToState } from '@stateManagment'
const URL = import.meta.env.VITE_ORDER_API.includes('=')?import.meta.env.VITE_ORDER_API.slice(1).trim():import.meta.env.VITE_ORDER_API;
export const productapi = axios.create({
  baseURL: URL+'/product',
  headers: {
    "Content-Type": "application/json",
  },
  
});

// Add a request interceptor to add the JWT access token to each outgoing request
productapi.interceptors.request.use( 
  (config) => {


    // Add the access token to the request headers if it exists
    if (getLocalAccessToken()) {

      config.headers["Authorization"] = 'Bearer ' + getLocalAccessToken();  // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    
    
    // Return the modified config object
    return config;
  },
  // Handle any errors that occur while modifying the request
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle expired access tokens
productapi.interceptors.response.use(
  (res) => {
    // If the response is successful, return it as is
    return res;
  },
  async (err) => {

    // Retrieve the original request config from the error object
    const originalConfig = await err.config;
    
    // Check if the original request was not for the /auth/signin endpoint and if the response status is 401 (Unauthorized)
    if (originalConfig.url !== "/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        // If the access token is expired and this is the first retry, attempt to refresh the token
        originalConfig._retry = true;
        try {

           // Retrieve the new access token from the response data
          const responce = getLocalRefreshToken()&&await setTokenToState();
          return productapi(originalConfig);
        } catch (_error) {

          // (getLocalRefreshToken()&&!!_error.response.status&&_error.response.status !== 200)&&setTokenToState(_error.response);
          // If refreshing the access token fails, reject the promise with the original error
          return Promise.reject(_error);
        }
      }
    }

    // If the response is not a 401 error or the original request was for the /auth/signin endpoint, reject the promise with the original error
    return Promise.reject(err);
  }
);
