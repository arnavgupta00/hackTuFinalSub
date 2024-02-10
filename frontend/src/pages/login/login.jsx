import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";

import {
  storeObject,
  exportObject,
  AuthenticationFunk,
} from "../../components/variableSet/variableSet.jsx";

import "./login.css";
import Navbar from "../../components/navbar/navbar.jsx";

export const Login = () => {
  const navigate = useNavigate();

  const url = "/api";

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  var signSearchHandle = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  var signSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "/api/login/" + formData.userEmail + "/" + formData.userPassword,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // You can adjust the content type as needed
          },
          // Add any other options like body, credentials, etc., as needed
        }
      );

      if (response.ok) {
        const result = await response.json();
        Cookies.set("token", result.message, { expires: 7 });
        storeObject(formData.userName, true);
        console.log("success");
        //await AuthenticationFunk();
        navigate("/home");
      } else {
        console.error("Failed to make request:", response.statusText);
        storeObject(formData.userName, false);
       
        //await AuthenticationFunk();
        navigate("/home")
      }
    } catch (error) {
      console.error("Failed to make request:", error);
      storeObject(formData.userName, false);
        
      navigate("/home")
    }
   
  };

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    signSubmit(event);
  };

  return (
    <>
      <div className="loginPage">
        <div className="loginPageBackground"></div>
        <form onSubmit={handleSubmit} className="loginPageForm">
          <div className="loginPageLogo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="loginPageHeading">
            <h1>Login</h1>
          </div>
          <input
            className="loginPageFormInput"
            type="text"
            placeholder="Username"
            name="userName"
            value={formData.userName}
            onChange={signSearchHandle}
          />
          <input
            className="loginPageFormInput"
            type="text"
            placeholder="Email"
            name="userEmail"
            value={formData.userEmail}
            onChange={signSearchHandle}
          />
          <input
            className="loginPageFormInput"
            type="password"
            name="userPassword"
            placeholder="Password"
            value={formData.userPassword}
            onChange={signSearchHandle}
          />
          <button type="submit" className="loginPageFormButton">
            Login
          </button>
          <div className="changeModes">
            <p>
              Don't have an account?<a href="/signup">Sign Up</a>
            </p>
          </div>
          <Navbar />
        </form>
      </div>
    </>
  );
};
