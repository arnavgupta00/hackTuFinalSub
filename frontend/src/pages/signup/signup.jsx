import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";

import {
  storeObject,
  exportObject,
  AuthenticationFunk,
} from "../../components/variableSet/variableSet.jsx";
import "../login/login.css";

export const SignUp = () => {
  const url = "/api";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });
  var signSearchHandle = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  var signSubmit = async (event) => {
    
    event.preventDefault();

    try {
      const response = await fetch(
        "/api/register/" +
          formData.userEmail +
          "/" +
          formData.userPassword +
          "/" +
          formData.userName,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        
      }
    } catch (error) {
      console.error("Failed to make request:", error);
      storeObject(formData.userName, false);
       
        //await AuthenticationFunk();
        
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
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
            <h1>Sign Up</h1>
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
            Sign Up
          </button>
          <div className="changeModes">
            <p>
              Already have an account?<a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
