import { create } from 'zustand';
import { persist } from "zustand/middleware";
import {produce} from "immer";
import { loginService,loginWithGoogleService,refreshTokenService} from "@services";
const params = new URLSearchParams(window.location.search);
export const userMangerState = create(
  persist(
    (set,get) => ({
      user: {
        roles: ['guest']
      },
      loginErrorMessage: "",
      loginError: false,
      loginSuccessMessage: "",
      loginSuccess: false,
      isRegister: false,
      isAuthenticated: true,
      isVerificationCodeCheck: false,
      isLoggedout: false,    
      isLoading: false,
      loginRequest: async (phonenumber, password) => {
        set(produce((draft) => {
          draft.isLoading = true;
        }));

        try {
          const response = await loginService(phonenumber, password);
          set(produce((draft) => {
            draft.isLoading = false;
            draft.isAuthenticated = true;
            draft.loginSuccessMessage = "Login Successfully";
            draft.loginSuccess = true;
            draft.user = response;
          }));
          window.location.href="/"
        } catch (error) {
          console.log(error);
          set(produce((draft) => {
            draft.isLoading = false;
            draft.isAuthenticated = false;
            draft.loginErrorMessage = error.response.data.message || error.response.data;
            draft.loginError = true;
          }));
        }
      },
      loginRequestWithGoogleRequest: async () => {
        set(produce((draft) => {
          draft.isLoading = true;
        }));

        try {
          const response = await loginWithGoogleService(params.get('accessKey'));
          console.log(response)
          set(produce((draft) => {
            draft.isLoading = false;
            draft.isAuthenticated = true;
            draft.loginSuccessMessage = "Login Successfully";
            draft.loginSuccess = true;
            draft.user = response;
          }));
          window.location.href="/"
        } catch (error) {
          console.log(error);
          set(produce((draft) => {
            draft.isLoading = false;
            draft.isAuthenticated = false;
            draft.loginErrorMessage = "Login Error";
            draft.loginError = true;
          }));
        }
      },
      logoutReuest: () => {
        set(produce((draft) => {
          draft.user = {
            roles: ['guest']
          };
          draft.loginErrorMessage = "";
          draft.loginError = false;
          draft.loginSuccessMessage = "";
          draft.loginSuccess = false;
          draft.isRegister = false;
          draft.isAuthenticated = false;
          draft.isVerificationCodeCheck = false;
          draft.isLoggedout = false;    
          draft.isLoading = false;
        }));
        window.location.href="/"
      },
      tokenRefreshRequest: async () => {

        try {
          const response = await refreshTokenService(get().user.refreshToken);
          if(response.status === 200){
          set(produce((draft) => {
          draft.isLoading = false;
          draft.user.refreshToken = response.data.refreshToken;
          draft.user.accessToken = response.data.accessToken;
          draft.isAuthenticated = true;
          }));
       //   window.location.href="/";
          }
          return response;
        }
       catch (error) {
      //  console.log(error.response.data.message);
        set(produce((draft) => {
          draft.user = {
            roles: ['guest']
          };
           draft.loginErrorMessage = error.response.data.message;
           draft.loginError = true;
           draft.isAuthenticated = false;
           draft.isLoggedout = true;    
           draft.isLoading = false;
        }));
        window.location.href="/";
        return error
      }

      },
      userMangerStateCleaner: () => {
        set(produce((draft) => {
          draft.loginErrorMessage = "";
          draft.loginError = false;
          draft.loginSuccessMessage = "";
          draft.loginSuccess = false;
          draft.isLoading = false;
        }));
      },


    }),
    {
      name: 'user-data-storage', // A unique name for the storage, so multiple stores don't conflict
      storage: {
        getItem: (key) => JSON.parse(localStorage.getItem(key)),
        setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
      }, // The storage engine you want to use, in this case local storage
      // Use immer middleware to enable immutability in the store
      middleware: (config) => [config.immer]
    }
  )
);

export const setTokenToState = async() =>(await userMangerState.getState().tokenRefreshRequest())


export const useUser = () => userMangerState((state) => state.user);
export const loginRequest = () => userMangerState((state) => state.loginRequest);
export const loginRequestWithGoogleRequest = () => userMangerState((state) => state.loginRequestWithGoogleRequest);
export const logoutRequest = () => userMangerState((state) => state.logoutRequest);

export const tokenRefreshRequest = () => userMangerState((state) => state.tokenRefreshRequest);
