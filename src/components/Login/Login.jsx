import React, { FC, useState } from "react";
import "./Login.css";
import AuthService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Login({ setToken }) {
  const [userName, setUserName] = useState("");
  const [loginCode, setLoginCode] = useState("");

  //const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    console.log("Login");
    console.log("email:", userName, loginCode);
    const response = await AuthService.login(userName, loginCode);
    setToken(response.access_token);
    console.log("token", response);
  };

  return (
    <div className="login-wrapper mt-20">
      <p className="block text-gray-700 text-sm font-bold mb-4 ">
        Please Log In
      </p>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
        onSubmit={handleLogin}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor=""
          >
            User name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="example@example.com"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="***********"
            value={loginCode}
            onChange={(e) => setLoginCode(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
